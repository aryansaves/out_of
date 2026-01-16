import mongoose from "mongoose"

const seasonschema = new mongoose.Schema({
    rating : {
        type : Number,
        min : 1,
        max : 7,
        required : true
    },
    remarks : {
        type : String,
        default : ""
    }
},
{_id:false})

const mediaEntrySchema = new mongoose.Schema({
    
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
        type : {
            type : String,
            enum : ["movie", "series"],
            required : true
        },
        title : {
            type : String,
            required : true,
            trim : true
        },
        dateLogged : {
            type : Date,
            default : Date.now
        },
        ratingOverall : {
            type : Number,
            min : 1,
            max : 7
        },
        remarks : {
            type : String,
            default : ""
        },
        seasonWiseRating : {
            type : Boolean,
            default : false
        },
        seasonrating : {
            type : Map,
            of : seasonschema,
            default : undefined
        },
    },
    {
        timestamps:true
    })

    mediaEntrySchema.pre("save", async function() {
        if(this.type === "movie"){
            this.seasonWiseRating = false
            this.seasonrating = undefined
        }
        if(this.type === "series"){
            if(!this.seasonWiseRating) {
                this.seasonrating = undefined
            }
        } 
    })

    export default mongoose.model("mediaEntrySchema", mediaEntrySchema)