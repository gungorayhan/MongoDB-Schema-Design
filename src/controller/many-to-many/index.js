const { CourseModel, UserCourseModel } = require("../../model/many-to-many");


const createUser=async(req,res)=>{
    try {
        const {username, email} = req.body
        
        const newUser = new UserCourseModel({
            username,
            email
        })

        await newUser.save();

        res.status(201).json({
            data:newUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error) 
    }
}


const getUser =async(req,res)=>{
    try {
        const {id} = req.params
        const user = await UserCourseModel.findById(id).populate("enrolledCourses")
        if (!user) {
            return res.status(404).send("Kullanıcı bulunamadı");
          }
        res.status(200).json({
            data:user
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error) 
    }
}

const createCourse=async(req,res)=>{
    try {
            const {title, description} = req.body

            const newCourse = new CourseModel({
                title,
                description
            })

            await newCourse.save();

            res.status(201).json({
                data:newCourse
            })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}
const getCourse =async(req,res)=>{
    try {
        const {id} = req.params

        const course = await CourseModel.findById(id).populate("students")
        if (!course) {
            return res.status(404).send("Ders bulunamadı");
          }

        res.status(200).json({
            data:course
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).send(error) 
    }
}


const UserToCourse = async (req, res)=>{
    try {
        const {userId, courseId} = req.body

        const user = await UserCourseModel.findById(userId)
        const course = await CourseModel.findById(courseId)

        if(!user || !course){
            throw new Error("Kullanıcı veya ders bulunamadı")
        }

        course.students.push(user._id);
        user.enrolledCourses.push(course._id)

        await course.save()
        await user.save()

        res.status(200).json({
            message:"Kullanıcı ders başarıyla kaydedildi."
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

const updateUserCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Kullanıcıyı ve kursu bul
        const user = await UserCourseModel.findById(userId);
        const course = await CourseModel.findById(courseId);

        if (!user || !course) {
            throw new Error("Kullanıcı veya ders bulunamadı");
        }

        // Kullanıcının kurs kaydını güncelle
        if (!user.enrolledCourses.includes(course._id)) {
            user.enrolledCourses.push(course._id);
            course.students.push(user._id);
        } else {
            return res.status(400).json({
                message: "Kullanıcı zaten bu derse kayıtlı."
            });
        }

        await course.save();
        await user.save();

        res.status(200).json({
            message: "Kullanıcı ders kaydı başarıyla güncellendi."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
 

const updateUserCourseWithFindOneAndUpdate = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        const user = await UserCourseModel.findById(userId);
        const course = await CourseModel.findById(courseId);

        if (!user || !course) {
            throw new Error("Kullanıcı veya ders bulunamadı");
        }

        // Kullanıcının kayıtlı kursları güncelleniyor
        const updatedUser = await UserCourseModel.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { enrolledCourses: course._id } },
            { new: true }
        );

        // Kursun öğrenci listesine kullanıcı ekleniyor
        await CourseModel.findOneAndUpdate(
            { _id: courseId },
            { $addToSet: { students: user._id } }
        );

        res.status(200).json({
            message: "Kullanıcı ders kaydı başarıyla güncellendi.",
            data: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const removeUserFromCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        // Kullanıcıyı ve kursu bul
        const user = await UserCourseModel.findById(userId);
        const course = await CourseModel.findById(courseId);

        if (!user || !course) {
            throw new Error("Kullanıcı veya ders bulunamadı");
        }

        // Kullanıcının kurs kaydını sil
        user.enrolledCourses = user.enrolledCourses.filter(course => !course.equals(courseId));
        course.students = course.students.filter(student => !student.equals(userId));

        await course.save();
        await user.save();

        res.status(200).json({
            message: "Kullanıcı ders kaydı başarıyla silindi."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
const removeUserFromCoursePull = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        await UserCourseModel.updateOne(
            { _id: userId },
            { $pull: { enrolledCourses: courseId } }
        );

        await CourseModel.updateOne(
            { _id: courseId },
            { $pull: { students: userId } }
        );

        res.status(200).json({
            message: "Kullanıcı ders kaydı başarıyla silindi."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports ={
    createUser,
    createCourse,
    getUser,
    getCourse,
    UserToCourse,
    updateUserCourse,
    removeUserFromCourse
}


//for object

// await UserCourseModel.updateOne(
//     { _id: userId, "enrolledCourses._id": courseId },
//     {
//         $set: {
//             "enrolledCourses.$.title": "Yeni Başlık",
//             "enrolledCourses.$.description": "Yeni Açıklama"
//         }
//     }
// );

// await UserCourseModel.updateOne(
//     { _id: userId, "enrolledCourses._id": courseId },
//     { 
//         $unset: { "enrolledCourses.$.description": "" }
//     }
// );

// await UserCourseModel.updateOne(
//     { _id: userId },
//     { 
//         $pull: { enrolledCourses: { _id: courseId } } 
//     }
// );