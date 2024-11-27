const { Comment, User } = require('../../db')

const getCommentByIdProject = async function (data) {

    let { projectId } = data
    const result = await Comment.findAll({
        where: {
            deletedAt: null,
            projectId
        },
        include : {
            model : User,
            atributes : ["name"],
            trougth :{
                attributes : ["userId"]
              }

        }
    })
    return result
}





/* posteo del comentario, creacion */
const newComment = async function (data) {

    const { userId, projectId, comment } = data

    if (!comment.length || comment === ' ') {
        throw new Error('debes completar el campo antes de enviar')
    }

    const user = await User.findByPk(userId)


        const usuario = {
            profile_img: user.profile_img,
            user_name : user.user_name
        };

   const commentCreate = await Comment.create({
        userId,
        projectId,
        comment
    })

      
   return await getCommentByIdProject({projectId})
}


/* cambio del valor del commentario por parte de un usuario especifico, el mismo quien lo creó.
para mayor seguridad, nos podriamos preguntar si está activo el token con el cual el usuario inicia.
es decir, si su valro es "" o "<valor>" */
const changeComment = async function (data, id) {

    const { userId, projectId, comment } = data

    let thisComment = await Comment.findByPk(id)

    if (thisComment.userId !== userId || thisComment.projectId !== projectId) {
        throw new Error('no puedes cambiar este comentario')
    }
    if (!comment.length || comment === ' ') {
        throw new Error('debes completar el campo antes de enviar')
    }
    thisComment.comment = comment
    await thisComment.save()
    return thisComment
}


/* borrado del comentario */
const eliminateCommentController = async function (id) {
    await Comment.destroy({ where: { id } })
    return { id }
}


module.exports = {
    newComment,
    changeComment,
    eliminateCommentController,
    getCommentByIdProject 
}