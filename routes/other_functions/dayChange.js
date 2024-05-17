
const employee_module = require('./../../models/employee_module')

const dayChange = async ( req,res,next)=>{


    const {emp_id,dayToChange} = req.body;
  
    const that_employee = await employee_module.findOne({_id:emp_id.trim()})
    if(that_employee){
  
      var dayindex = that_employee.days.indexOf(dayToChange)
      // console.log(dayindex)
     if(dayindex === -1){
      that_employee.days.push(dayToChange)
      await that_employee.save();
  
      req.flash('message', 'Day Added')
      res.redirect(`/employee_Dashbord/${emp_id}`)
  
     }else{
  
      that_employee.days.remove(dayToChange)
      
      await that_employee.save();
      req.flash('message', 'Day Removed')
  
      res.redirect(`/employee_Dashbord/${emp_id}`)
  
     }
  
     
      
  
    }else {
      req.flash('error','employee not found')
      res.redirect('/')
    }
  
  }


  module.exports = dayChange