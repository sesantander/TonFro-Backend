module.exports = ({ name, mobileBookedFor, orderId, price, seatsBooked}) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 3px;
             vertical-align: top;
             }
            
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
            
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }

             table {
               border-collapse: separate;
               border-spacing: 0 15px;
             }
             
             th {
               background-color: #4287f5;
               color: white;
             }
             
             th,
             td {
               width: 150px;
               text-align: center;
               border: 1px solid black;
               padding: 5px;
             }

             #test{
               text-align: right;

             }
            
             
          </style>
       </head>
       <body>
          <div class="invoice-box">
            
                
                  
                           
                            <h1 class="justify-center">Aviana To N Fro Services pvt Ltd</h1>

                
                            <div>
                                  Date: ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
                            </div>
                          

                            <div id="test">
                               GST: 06AARCA6860E1ZH
                            </div>
                    
                           

                        
                           <div id="test"> Registered Address: C-2282 Sushant Lok phase-1 Gurugram, Haryana 122009 </div>
                       
                         

                       
                           <div>
                           Customer name: ${name}
                           </div>
                          
                           <div>
                           Mobile No: ${mobileBookedFor}
                          </div>
                     
                        

              
                           

                 

           


             <table class="table table-sm table-bordered table-responsive-md table-striped table-hover text-center">
               
             <thead>
               
             <tr>
                 <th>Order Id</th>
                 <th>No of Seats</th>
                 <th>Price</th>
               
                              
                
               </tr>
             </thead>
             <tbody>
               
                   <tr>
                   <td>${orderId} </td>
                   <td>${seatsBooked}</td>
                   <td>${price}</td>
                 
                   
                  
                  </tr>
              
             </tbody>

             </table>


             &nbsp;


             <table class="table table-sm table-bordered table-responsive-md table-striped table-hover text-center">
               
             <thead>
               
             <tr>
                 <th>CGST (2.5%)</th>
                 <th>SGST (2.5%)</th>
                
               
                              
                
               </tr>
             </thead>
             <tbody>
               
                   <tr>
                   <td>${price*0.025}</td>
                   <td>${price*0.025}</td>
                  
                 
                   
                  
                  </tr>
              
             </tbody>

             </table>


             <div></div>




             &nbsp;
             <table class="table table-sm table-bordered table-responsive-md table-striped table-hover text-center">
               
             <thead>
               
             <tr>
                 <th>Total</th>
                 
                          
                
               </tr>
             </thead>
             <tbody>
               
                   <tr >
                   
                   <td>${price+((price*0.025)*2)}</td>
                  
                 
                   
                  
                  </tr>
              
             </tbody>

             </table>

             
 




             <br />
             
          </div>

      
      



       </body>
    </html>
    `;
};