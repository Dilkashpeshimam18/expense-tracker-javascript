let price=document.querySelector('#price')
let desc=document.querySelector('#description')
let category=document.getElementById('category')
let button=document.querySelector('.btn')
let allExpense=[]
let expenseObj={}


button.addEventListener('click',(e)=>{
   e.preventDefault()

   if(price.value=='' || desc.value==''){
    alert('Please enter the value')
   }else{
      expenseObj={
        price:price.value,
        description:desc.value,
      }

      localStorage.setItem(`expense ${desc.value}`,JSON.stringify(expenseObj))
   }
})

document.addEventListener('DOMContentLoaded',()=>{
    Object.keys(localStorage).forEach(function(keys){
        console.log(JSON.parse(localStorage.getItem(keys)))
        let expense=JSON.parse(localStorage.getItem(keys))
        allExpense.push(expense)
        console.log(allExpense)
    })

    allExpense.forEach((expense)=>{
        let expenseList= document.getElementById('list')

let expenseLi=document.createElement('li')
expenseLi.id=`expense ${expense.description}`
expenseLi.appendChild(document.createTextNode(`${expense.description}  ${expense.price}`))

let deleteBtn=document.createElement('button')
deleteBtn.appendChild(document.createTextNode('Delete'))

let editBtn=document.createElement('button')
editBtn.appendChild(document.createTextNode('Edit'))

expenseLi.appendChild(deleteBtn)
expenseLi.appendChild(editBtn)

deleteBtn.onclick=function(){
    localStorage.removeItem(`expense ${expense.description}`)
    let delExp= document.getElementById(`expense ${expense.description}`)
    expenseList.removeChild(delExp)
}

expenseList.appendChild(expenseLi)

    })
})







