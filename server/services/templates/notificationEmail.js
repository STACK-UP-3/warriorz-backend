import dotenv from 'dotenv';

dotenv.config();

export default (fullName,emailMessage) =>{

    const url = `${process.env.URL_MESSAGE}`
    const emailTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Karla|Lato|Nunito|Raleway|Rubik&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/da7b84dcbd.js" crossorigin="anonymous"></script>
        <title>Document</title>
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            .temp{
                font-family: lato;
                font-size: 18px;
            }
            .background{
                height: 35vh;
                background-color: #083B66;
                text-align: center;
                padding-top: 4vh;
                }
            .all{
                position: relative;
                padding: 10px;
                text-align: center;
            }    
            #logo{
                    border-radius: 50%;
                }
            .logo p{
                    margin-top: 10vh;
                }
            h2{
                    color: white;
                    margin-top: 4vh;
                    
                }
            .details{
                line-height: 1.5;
                margin-top: 3vh;
            }
            .det{
                text-align: justify;
                margin-left: 40%; 
            }
            .footer{
                text-align: center;
                font-size: 16px;
                padding: 10px;
                line-height: 1.7;
                margin-top: 10vh;
            }
    
        </style>
    </head>
    <body >
        <div class="temp">
            <div class="background">
                <div class="logo">
                    <img id="logo" src="https://lh3.googleusercontent.com/-eOVinaNCfkw/XoNrkFhGtmI/AAAAAAAAAAs/az0telisXaEM8VS5xrRe9yUkALYnCxn3ACEwYBhgL/w140-h140-p/wallpaper.png" alt="logo">
                    <h2>Dear ${fullName}</h2> 
                    
                </div>
            </div>
            <div class="all">
                   <p >This is to inform you that ${ emailMessage }.</p>
                    <div class="details">
                        <h3>Your can view the details here:</h3>
                        <div class="det">
                            <p><b>Link: </b> <i> <a href="${url}">${url}</a></i></p>
                        </div>
                    </div>
            </div>
            <div class="footer">
                <p> Thank you for using Barefoot Nomad.</p>
            </div>
        </div>    
    </body>
    </html>
`;

    return emailTemplate;
}
