let price=document.querySelector('#price')
let desc=document.querySelector('#description')
let category=document.getElementById('category')
let button=document.querySelector('.btn')
let allExpense=[]
let expenseObj={}

let categoryval=''
category.onchange=function(evt){
    categoryval = evt.target.value;
    console.log(categoryval)

}

button.addEventListener('click',(e)=>{
   e.preventDefault()

   if(price.value=='' || desc.value=='' || categoryval==''){
    alert('Please enter the value')
   }else{
      expenseObj={
        price:price.value,
        description:desc.value,
        category:categoryval
      }

      localStorage.setItem(`expense${desc.value}`,JSON.stringify(expenseObj))
      displayExpense(expenseObj)
    }
})


document.addEventListener('DOMContentLoaded',()=>{
    Object.keys(localStorage).forEach(function(keys){
        let expense=JSON.parse(localStorage.getItem(keys))
        allExpense.push(expense)
        console.log(allExpense)
    })

    allExpense.forEach((expense)=>{
        let expenseList= document.getElementById('list')

        
let expenseLi=document.createElement('li')
expenseLi.id=`expense${expense.description}`
if(expense.category != null){
    expenseLi.appendChild(document.createTextNode(`${expense.description}  ${expense.price} - ${expense.category}`))

}else{
    expenseLi.appendChild(document.createTextNode(`${expense.description}  ${expense.price}`))

}

let deleteBtn=document.createElement('button')
deleteBtn.appendChild(document.createTextNode('Delete'))

let editBtn=document.createElement('button')
editBtn.appendChild(document.createTextNode('Edit'))

expenseLi.appendChild(deleteBtn)
expenseLi.appendChild(editBtn)

deleteBtn.onclick=function(){
    localStorage.removeItem(`expense${expense.description}`)
    let delExp= document.getElementById(`expense${expense.description}`)
    expenseList.removeChild(delExp)
}

expenseList.appendChild(expenseLi)

    })


})



function displayExpense(expenseObj){

        
        let userList=document.querySelector('.expense-list')
        let userTag=`<li id='expense${expenseObj.description}'> ${expenseObj.description} ${expenseObj.price} - ${expenseObj.category} <button onClick=deleteExpense('expense${expenseObj.description}')>Delete</button><button onClick=editExpense('expense${expenseObj.description}')>Edit</button></li> `
        userList.innerHTML= userList.innerHTML + userTag 
        document.querySelector('#price').value=''
        document.querySelector('#description').value=''
        document.getElementById('category').value=''

  
}

function deleteExpense(id){
  localStorage.removeItem(id)
  let ulList=document.querySelector('.expense-list')
  let liToDelete=document.getElementById(id)
  ulList.removeChild(liToDelete)
}

function editExpense(id){
    let item=JSON.parse(localStorage.getItem(id))
    console.log(item.price)
    let price=document.querySelector('#price')
    price.value=item.price
    let des=document.getElementById('description')
    des.value=item.description

  let expenseLi=document.getElementById(id)
  expenseLi.innerHTML=`${item.description} ${item.price}`


}





