const isValidEvent = (socket, next) => {
  socket.use(([event,data,callback])=>{
    try{
      console.log(event);
      next();
    }catch (e) {
      next(e);
    }
  });
}
export default isValidEvent;
