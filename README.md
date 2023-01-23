
note : Environment values are stored in .env file

Step:1 

You have to run the user_access_api file and hit the corresponding API.

Procedure to  pass input



POST method(/users)

Sample Input(BODY)

{
name:’muthu kumaran m’,
email:’kumaran3853@gmail.com’,
dob:’12/14/1999’  (should be MM/DD/YYYY)
}

Sample output

{
Status:1,
Msg:’documents were inserted successfully’
data:{
name:’muthu kumaran m’,
email:’kumaran3853@gmail.com’,
dob:’12/14/1999’
}
}

GETmethod(/users/kumaran3853@gmail.com)

sample input 

http://localhost:8839/users/kumaran3853@gmail.com

Sample output{
Status:1,
Msg:’documents were fetchedsuucessfully’
data:{[
id:ObjectId(‘45436536kkscsfa57657n’)
name:’muthu kumaran m’,
email:’kumaran3853@gmail.com’,
dob:’1999-12-14 11:55 12:32Z ’
}]
}

DELETE method(/users/kumaran3853@gmail.com)

sample input 

http://localhost:8839/users/kumaran3853@gmail.com

Sample output
{Status:1,
Msg:’documents were deleted successfully’}



If any mandatory inputs are missing

Output:
{Status:1,
Msg:’insufficient inputs….’}

















