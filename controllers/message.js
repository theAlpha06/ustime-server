import Message from '../models/message.js'

const addMessage = async(req, res) => {
    try {
      const { from, to, message } = req.body;
      const data = await Message.create({
        message: { text: message },
        users: [ from, to ],
        sender: from,
      })
      if (data) {
        return res.json({
          msg: "Done"
        })
      } else {
        return res.json({
          msg: "fail!"
        })
      }
    } catch (error) {
      console.log(error)
    }
}

const getAllMsg = async(req, res) => {
    try {
      const { from, to } = req.body;
      const messages = await Message.find({
        users: {
          $all: [from, to]
        }
      }).sort({updatedAt: 1});
      const projectMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text
        }
      })
      return res.json(projectMessages);
    } catch (error) {
      
    }
}

export { addMessage, getAllMsg };
