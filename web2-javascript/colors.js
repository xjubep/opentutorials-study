var Links = {
    setColor: function (color) {
        var aList = document.querySelectorAll('a');
        for (var i = 0; i < aList.length; i++) {
            aList[i].style.color = color;
        }
    }
}

var Body = {
    setColor: function (color) {
        document.querySelector('body').style.color = color;
    },
    setBackgroundColor: function (color) {
        document.querySelector('body').style.backgroundColor = color;
    }
}

var Input = {
    setColor: function (color) {
        document.querySelector('input').style.color = color;
    },
    setBackgroundColor: function (color) {
        document.querySelector('input').style.backgroundColor = color;
    }
}
function nightDayHandler(self) {
    if (self.value === 'night') {
        Body.setColor('white');
        Body.setBackgroundColor('#303030');
        Input.setColor('white');
        Input.setBackgroundColor('#424242');
        Links.setColor('white');
        self.value = 'day';
    }
    else {
        Body.setColor('black');
        Body.setBackgroundColor('#FAFAFA');
        Input.setColor('black');
        Input.setBackgroundColor('white');
        Links.setColor('black');
        self.value = 'night';
    }
}