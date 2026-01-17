import User from "../models/User.js"
import MediaEntry from "../models/MediaEntry.js"

const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("username bio createdAt")
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Found"
            })
        }
        const mediaWatched = await MediaEntry.countDocuments({userId: user._id})

        const top = await MediaEntry.find({userId: user._id})
            .select("type title ratingOverall remarks dateLogged")
            .sort({ratingOverall: -1, dateLogged: -1, createdAt: -1})
            .limit(10)
        
        const recentLogs = await MediaEntry.find({userId: user._id})
            .select("type title ratingOverall remarks dateLogged")
            .sort({ dateLogged: -1, createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success : true,
            data: {
                username : user.username,
                bio : user.bio,
                joinedAt : user.createdAt,
                mediaWatched,
                top,
                recentLogs
            }
        })

    } catch(error) {
        next(error)
    }
}
const getPublicProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("username bio createdAt");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const mediaWatched = await MediaEntry.countDocuments({ userId: user._id });

    const top = await MediaEntry.find({ userId: user._id })
      .select("type title ratingOverall remarks dateLogged")
      .sort({ ratingOverall: -1, dateLogged: -1, createdAt: -1 })
      .limit(4);

    // diary list with pagination
    const { page = 1, limit = 20, type } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const query = { userId: user._id };
    if (type) query.type = type;

    const [totalLogs, logs] = await Promise.all([
      MediaEntry.countDocuments(query),
      MediaEntry.find(query)
        .select("type title ratingOverall remarks dateLogged seasonWiseEnabled seasonRatings")
        .sort({ dateLogged: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
    ]);

    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        bio: user.bio,
        joinedAt: user.createdAt,
        mediaWatched,
        top,
        diary: {
          page: pageNum,
          limit: limitNum,
          total: totalLogs,
          pages: Math.ceil(totalLogs / limitNum),
          logs
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export default {getPublicProfile, getMyProfile}