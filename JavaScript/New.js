 let emps= [

{ id: 1, name: "Rahul", age: 25, salary: 30000 },
{ id: 2, name: "Priya", age: 28, salary: 45000 },
 { id: 3, name: "Arjun", age: 24, salary: 28000 }, 
{ id: 4, name: "Sneha", age: 30, salary: 50000}, 
{ id: 5, name: "Kiran", age: 27, salary: 40000 }

];
 console.log(emps);

// 1 create new arr with only emp names 
let names = emps.map(emp=>emp.name);
console.log(names);
// 2 give 500 ncrement to all emps 

let Newemps = emps.map(emp=> ({
  salary : emp.salary + 5000
}));
console.log(Newemps);