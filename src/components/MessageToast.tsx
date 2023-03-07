interface MessageToastProps {
  message: string
}
const MessageToast: React.FC<MessageToastProps> = ({ message }) => {

  return (
    <div className="px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg">
      <p className="text-sm">
        <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
        {message}
      </p>
    </div>
  )
}

export default MessageToast