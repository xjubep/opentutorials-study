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