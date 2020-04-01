import dotenv from 'dotenv';

dotenv.config();

export default ( token, firstname, lastname, email) =>{

    const url = `${process.env.VERIFY_URL}/${token}`;
    const devUrl = `${process.env.URL_DEV}`
    const message = `<!DOCTYPE html>
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
                table{
                    line-height: 2;
                }
            .content{
                font-size: 16px;
                padding: 10px;
                line-height: 1.7;
            }
            button{
                background:  #083B66;
                padding: 15px 19px;
                border-radius: 5px;
                border: 1.5px solid white;
                width: 300px;
                height: 7vh;
                color: #fff;
                cursor: pointer;
                outline: none;
                display: inline-block;
                font-size: 16px;
                text-align: center;
                letter-spacing: 0.5px;
                margin-top: -2vh;
                margin-bottom: 5vh;
            }
            .details{
                line-height: 1.5;
                margin-top: 3vh;
            }
            .det{
                text-align: justify;
                margin-left: 40%; 
            }
            .td{
                padding-right: 20px;
                width: 100%;
            }
    
        </style>
    </head>
    <body >
        <div class="temp">
            <div class="background">
                <div class="logo">
                    <img id="logo" src="https://lh3.googleusercontent.com/-J1_BUhH0liU/XoNwV3WL9_I/AAAAAAAAABY/nF7QPalnDk0_gzXo_nG7GmlZNO1Gr66kQCEwYBhgLKs0DAMBZVoC8ckRtgHhZ6Ytt8mEoJ4lU0cU3hkP_MQGT0zJ6WAqMvBLeYCJIoe37E-90_iDW2YuovIcIHa3PhgY9bCsA95xaZv0TxBQBqwkiwUBPvL2NLtKwxe3WKA8r-S7UaDekKRFvu5_lRrvkDz6nptqdmN2vxPXE4FABBdekY4YnrmAIE2HEL2oVUNtnO9Sv-QIbuI-gIQw3Pvaj944mZA4yBApCVRNLhbzW71wOD7aYVOi01W9tPXm7W26vj1Y5qpSQziEOu29FO6_EuhG5h8G3aV5woU_a0TWGvxAlFEF5b4m1yK8bm8DIoGt4yJRKlpKverKwj2bUacl-CN1_qbVM6G33jwV8uSq11MpIjw6FdxgsbQKw-aARDA0XAAcJEflWxd6wO9njhv-HRtpOQsRdHlfqFSCbxSuJ5tkYSyvvj3oWwwDKNcrz0OLkzfe0RRwA7-IFq0KKSvG1YY08b_nvUGX53ZYb3dJK8m2x_1Y3pY_Y4N_KLdZFUSaux0Ldj2hRG2ROFiWRLKJfzf3dJhIfMfdUG0XHkShAc5aINpyRuYinn6w8zQESBbdErMED7qHU3hEruYUdKxByXmX35WHruNtWNt2TL4yMEIIw7OSO9AU/w140-h140-p/wallpaper.png" alt="logo">
                    <h2>Welcome ${firstname} ${lastname}</h2> 
                    
                </div>
            </div>
            <div class="all">
                   <p >Thanks for joining Barefoot Nomad. To finish registration, please click the button bellow.</p>
                    <div class="details">
                        <h3>Your account details:</h3>
                        <div class="det">
                            <p><b>Email: </b> <i> ${email}</i></p> 
                            <p><b>Link: </b> <i> <a href="${devUrl}">${devUrl}</a></i></p>
                        </div>
                    </div>
                <div class="content">    
                    <p> 
                    </p><br>
                    <a href="${url}" ><button > Verify email address </button> </a>
                    <hr>
                    <p> Once verified, You can enjoy all the features provided by BareFoot Nomad.</p>
                    <p style="font-size: 14px;"> This link lasts 4 hours.</p>
                </div>
            </div>
            
    
        </div>    
    </body>
    </html>`;

    return message;
}
