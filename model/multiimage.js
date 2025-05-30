import mongoose from "mongoose";


import  Room from "./room"



const muiltiImageSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId, // assuming it's a reference
    ref: 'Room',
    required: true
  },
  
  multi_image: {
    type: String,
    default: null
  },
  
}, { timestamps: true });

export default mongoose.models.MultiImage || mongoose.model('MultiImage', muiltiImageSchema);
