const prisma = require('../helpers/database')

class _user {
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listUSer user module Error: ',error)

            return {
                status: false,
                Error
            }
        }
    }
}

module.exports = new_user()
