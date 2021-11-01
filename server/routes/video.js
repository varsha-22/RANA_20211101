import express from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import { Video } from '../models/Video';

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.mov') {
            return cb(res.status(400).end('only mov, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
const maxSize = 209715200.0
var upload = multer({ storage: storage, limits: { fileSize: maxSize } }).single("file")


//=================================
//             Video
//=================================


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        
        const fileExt = res.req.file.originalname.split('.').pop();
        if (fileExt === 'mp4' || fileExt === 'mov') {
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        } else {
            return res.status(400).end('only mov, mp4 is allowed')
        }
        
    })

});


router.post("/thumbnail", (req, res) => {

    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        // console.dir(metadata);
        // console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            // console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            size:'256x256',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});




router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});



router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body)
    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true ,
            video
        })
    })

});


router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

export default router;
