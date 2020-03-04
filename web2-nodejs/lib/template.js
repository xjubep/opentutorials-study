module.exports = {
    html:function(title, list, body, control) {
        return `
        <!DOCTYPE html>
        <html>
    
        <head>
            <title>WEB - ${title}</title>
            <meta charset="utf-8">
            <!-- <link rel="stylesheet" href="style.css"> -->
            <style type="text/css">
                body {
                    margin: 0;
                    background-color: #FAFAFA;
                }
                
                h1 {
                    font-size: 45px;
                    text-align: center;
                    border-bottom: 1px solid gray;
                    margin: 0;
                    padding: 20px;
                }
                
                ul {
                    border-right: 1px solid gray;
                    width: 100px;
                    margin: 0;
                    padding: 20px;
                }
                
                a {
                    text-decoration: none;
                    color:black;
                }
                
                #grid {
                    display: grid;
                    grid-template-columns: 150px 1fr;
                }
                
                #grid #article {
                    padding-left: 25px;
                    padding-right: 25px;
                }
                
                #grid ul {
                    padding-left: 35px;
                }
                
                #toggle {
                    text-align:center;
                    padding:20px;
                }
                
                #btn {
                    border: 1px #F0F0F0;
                    padding:5px;
                    border-radius:5px;
                    width:45px;
                    background-color: #F0F0F0;
                    font-weight: bold;
                }
                
                img {
                    width: 600px;
                    display:block;
                    margin-left:auto;
                    margin-right: auto;
                }
                
                @media(max-width: 800px) {
                    #grid {
                        display: block;
                    }
                
                    ul {
                        border-right: none;
                    }
                
                    h1 {
                        border-bottom: none;
                    }
                
                    img  {
                        width: 100%;
                    }
                }
            </style>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <!-- <script src="colors.js"></script> -->
            <script type="text/javascript">
                var Links = {
                    setColor: function (color) {
                        $('a').css('color', color);
                    }
                }
                
                var Body = {
                    setColor: function (color) {
                        $('body').css('color', color);
                    },
                    setBackgroundColor: function (color) {
                        $('body').css('backgroundColor', color);
                    }
                }
                
                var Input = {
                    setColor: function (color) {
                        $('input').css('color', color);
                    },
                    setBackgroundColor: function (color) {
                        $('input').css('backgroundColor', color);
                    },
                    setBorderColor: function (color) {
                        $('input').css('border-color', color);
                    }
                }
                
                function nightDayHandler(self) {
                    if (self.value === 'night') {
                        Body.setColor('white');
                        Body.setBackgroundColor('#303030');
                        Input.setColor('white');
                        Input.setBackgroundColor('#424242');
                        Input.setBorderColor('#424242');
                        Links.setColor('white');
                        self.value = 'day';
                    }
                    else {
                        Body.setColor('black');
                        Body.setBackgroundColor('#FAFAFA');
                        Input.setColor('black');
                        Input.setBackgroundColor('#F0F0F0');
                        Input.setBorderColor('#F0F0F0');
                        Links.setColor('black');
                        self.value = 'night';
                    }
                }
            </script>
        </head>
    
        <body>
            <h1><a href="/">WEB</a></h1>
            <div id="grid">
                ${list}
                ${control}
                ${body}
            </div>
            <div id="toggle">
                <input id="btn" type="button" value="night" onclick="nightDayHandler(this);">
            </div>
        </body>
    
        </html>
        `;
    },
    list:function (title, filelist) {
        var list = '<ul>';
        for (var i = 0; i < filelist.length; i++) {
            if (title === filelist[i]) {
                list += '<b>'
            }
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            if (title === filelist[i]) {
                list += '</b>'
            }
        }
        list += '</ul>';
        return list;
    }
}