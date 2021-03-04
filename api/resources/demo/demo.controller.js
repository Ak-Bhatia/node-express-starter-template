import { Demo } from './demo.model';

export default {
    getDemo(req, res){
        Demo.find({}, (err, demo) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            return res.json({success:true,message:"All documents",data:demo});
        })
    },
    
    addNewDemo(req, res){
        let newDemo = new Demo(req.body);
        newDemo.save((err, demo) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            return res.json({success:true,message:"Document added",data:demo});
        })
    },

    getDemoById(req, res){
        Demo.findById(req.params.demoid, (err, demo) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            return res.json({success:true,message:"Document by id",data:demo});
        })
    },

    updateDemo(req, res){
        Demo.findOneAndUpdate({ _id: req.params.demoid }, req.body, { new: true } , (err, demo) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            return res.json({success:true,message:"Document updated",data:demo});
        })
    },

    deleteDemo(req, res){
        Demo.deleteOne({ _id: req.params.demoid }, (err, demo) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            return res.json({success:true,message:"Document deleted"});
        })
    }
}
