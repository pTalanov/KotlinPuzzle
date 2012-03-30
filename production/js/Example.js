var classes = function(){
  var tmp$0 = Kotlin.Class.create({initialize:function(x, y){
    this.$x = x;
    this.$y = y;
  }
  , get_x:function(){
    return this.$x;
  }
  , get_y:function(){
    return this.$y;
  }
  , plus:function(v){
    {
      return example.v(this.get_x() + v.get_x(), this.get_y() + v.get_y());
    }
  }
  , minus:function(){
    {
      return example.v(-this.get_x(), -this.get_y());
    }
  }
  , minus$0:function(v){
    {
      return example.v(this.get_x() - v.get_x(), this.get_y() - v.get_y());
    }
  }
  , times:function(koef){
    {
      return example.v(this.get_x() * koef, this.get_y() * koef);
    }
  }
  , distanceTo:function(v){
    {
      return Math.sqrt(this.minus$0(v).get_sqr());
    }
  }
  , rotatedBy:function(theta){
    {
      var sin = Math.sin(theta);
      var cos = Math.cos(theta);
      return example.v(this.get_x() * cos - this.get_y() * sin, this.get_x() * sin + this.get_y() * cos);
    }
  }
  , isInRect:function(topLeft, size){
    {
      return this.get_x() >= topLeft.get_x() && this.get_x() <= topLeft.get_x() + size.get_x() && this.get_y() >= topLeft.get_y() && this.get_y() <= topLeft.get_y() + size.get_y();
    }
  }
  , get_sqr:function(){
    {
      return this.get_x() * this.get_x() + this.get_y() * this.get_y();
    }
  }
  , get_normalized:function(){
    {
      return this.times(1 / Math.sqrt(this.get_sqr()));
    }
  }
  });
  var tmp$1 = Kotlin.Class.create({initialize:function(){
    this.$selected = false;
  }
  , draw:function(state){
  }
  , contains:function(mousePos){
  }
  , get_pos:function(){
    return this.$pos_0;
  }
  , set_pos:function(tmp$0){
    this.$pos_0 = tmp$0;
  }
  , get_selected:function(){
    return this.$selected;
  }
  , set_selected:function(tmp$0){
    this.$selected = tmp$0;
  }
  , shadowed:function(receiver, shadowOffset, alpha, render){
    {
      receiver.save();
      receiver.shadowColor = 'rgba(100, 100, 100, ' + alpha + ')';
      receiver.shadowBlur = 5;
      receiver.shadowOffsetX = shadowOffset.get_x();
      receiver.shadowOffsetY = shadowOffset.get_y();
      render.call(receiver);
      receiver.restore();
    }
  }
  , fillPath:function(receiver, constructPath){
    {
      receiver.beginPath();
      constructPath.call(receiver);
      receiver.closePath();
      receiver.fill();
    }
  }
  });
  var tmp$2 = Kotlin.Class.create(tmp$1, {initialize:function(i, j, imageX, imageY, width, height){
    this.$i = i;
    this.$j = j;
    this.$imageX = imageX;
    this.$imageY = imageY;
    this.$width = width;
    this.$height = height;
    this.super_init();
    this.$pos = example.v(0, 0);
  }
  , get_i:function(){
    return this.$i;
  }
  , get_j:function(){
    return this.$j;
  }
  , get_imageX:function(){
    return this.$imageX;
  }
  , get_imageY:function(){
    return this.$imageY;
  }
  , get_width:function(){
    return this.$width;
  }
  , get_height:function(){
    return this.$height;
  }
  , get_pos:function(){
    return this.$pos;
  }
  , set_pos:function(tmp$0){
    this.$pos = tmp$0;
  }
  , contains:function(mousePos){
    {
      return mousePos.isInRect(this.get_pos(), example.v(this.get_width(), this.get_height()));
    }
  }
  , draw:function(state){
    {
      state.get_context().drawImage(example.get_Image().get_data(), this.get_imageX(), this.get_imageY(), this.get_width(), this.get_height(), Math.floor(this.get_pos().get_x()), Math.floor(this.get_pos().get_y()), this.get_width(), this.get_height());
    }
  }
  });
  var tmp$3 = Kotlin.Class.create({initialize:function(canvas){
    this.$canvas = canvas;
    this.$width = this.get_canvas().width;
    this.$height = this.get_canvas().height;
    this.$context = getContext();
    this.$valid = false;
    this.$shapes = new Kotlin.ArrayList;
    this.$selection = null;
    this.$dragOff = new example.Vector(0, 0);
    this.$interval = 1000 / 30;
    {
      var tmp$0_0;
      $(this.get_canvas()).mousedown((tmp$0_0 = this , function(it){
        {
          tmp$0_0.set_valid(false);
          tmp$0_0.set_selection(null);
          var mousePos = tmp$0_0.mousePos_0(it);
          var tmp$0;
          {
            tmp$0 = tmp$0_0.get_shapes().iterator();
            while (tmp$0.hasNext()) {
              var shape = tmp$0.next();
              {
                if (shape.contains(mousePos)) {
                  tmp$0_0.set_dragOff(mousePos.minus$0(shape.get_pos()));
                  shape.set_selected(true);
                  tmp$0_0.set_selection(shape);
                  break;
                }
              }
            }
          }
        }
      }
      ));
      var tmp$1;
      $(this.get_canvas()).mousemove((tmp$1 = this , function(it){
        {
          if (tmp$1.get_selection() != null) {
            Kotlin.sure(tmp$1.get_selection()).set_pos(tmp$1.mousePos_0(it).minus$0(tmp$1.get_dragOff()));
            tmp$1.set_valid(false);
          }
        }
      }
      ));
      var tmp$2;
      $(this.get_canvas()).mouseup((tmp$2 = this , function(it){
        {
          if (tmp$2.get_selection() != null) {
            Kotlin.sure(tmp$2.get_selection()).set_selected(false);
          }
          tmp$2.set_selection(null);
          tmp$2.set_valid(false);
        }
      }
      ));
      var tmp$3;
      setInterval((tmp$3 = this , function(){
        {
          tmp$3.draw();
        }
      }
      ), this.get_interval());
    }
  }
  , get_canvas:function(){
    return this.$canvas;
  }
  , get_width:function(){
    return this.$width;
  }
  , set_width:function(tmp$0){
    this.$width = tmp$0;
  }
  , get_height:function(){
    return this.$height;
  }
  , set_height:function(tmp$0){
    this.$height = tmp$0;
  }
  , get_size:function(){
    {
      return example.v(this.get_width(), this.get_height());
    }
  }
  , get_context:function(){
    return this.$context;
  }
  , get_valid:function(){
    return this.$valid;
  }
  , set_valid:function(tmp$0){
    this.$valid = tmp$0;
  }
  , get_shapes:function(){
    return this.$shapes;
  }
  , set_shapes:function(tmp$0){
    this.$shapes = tmp$0;
  }
  , get_selection:function(){
    return this.$selection;
  }
  , set_selection:function(tmp$0){
    this.$selection = tmp$0;
  }
  , get_dragOff:function(){
    return this.$dragOff;
  }
  , set_dragOff:function(tmp$0){
    this.$dragOff = tmp$0;
  }
  , get_interval:function(){
    return this.$interval;
  }
  , mousePos_0:function(e){
    {
      var offset = new example.Vector(0, 0);
      var element = this.get_canvas();
      while (element != null) {
        var el = Kotlin.sure(element);
        offset = offset.plus(new example.Vector(el.offsetLeft, el.offsetTop));
        element = el.offsetParent;
      }
      return (new example.Vector(e.pageX, e.pageY)).minus$0(offset);
    }
  }
  , addShape:function(shape){
    {
      this.get_shapes().add(shape);
      this.set_valid(false);
    }
  }
  , clear:function(){
    {
      this.get_context().fillStyle = '#FFFFFF';
      this.get_context().fillRect(0, 0, this.get_width(), this.get_height());
      this.get_context().strokeStyle = '#000000';
      this.get_context().lineWidth = 4;
      this.get_context().strokeRect(0, 0, this.get_width(), this.get_height());
    }
  }
  , draw:function(){
    {
      if (this.get_valid())
        return;
      this.clear();
      var tmp$0;
      {
        tmp$0 = example.reversed(this.get_shapes()).iterator();
        while (tmp$0.hasNext()) {
          var shape = tmp$0.next();
          {
            shape.draw(this);
          }
        }
      }
      this.set_valid(true);
    }
  }
  });
  return {Shape:tmp$1, Piece:tmp$2, CanvasState:tmp$3, Vector:tmp$0};
}
();
var kotlin = Kotlin.Namespace.create({initialize:function(){
}
, set:function(receiver, key, value){
  {
    return receiver.put(key, value);
  }
}
}, {});
var example = Kotlin.Namespace.create({initialize:function(){
  this.$Image = Kotlin.object.create({initialize:function(){
    this.$width = 400;
    this.$height = 400;
    this.$pieces = 5;
  }
  , get_data:function(){
    {
      return getImage('Chrysanthemum.jpg');
    }
  }
  , get_width:function(){
    return this.$width;
  }
  , get_height:function(){
    return this.$height;
  }
  , get_pieces:function(){
    return this.$pieces;
  }
  , splitInPieces:function(){
    {
      var r = new Kotlin.ArrayList;
      r.add(new example.Piece(0, 0, 0, 0, 100, 100));
      return r;
    }
  }
  });
}
, v:function(x, y){
  {
    return new example.Vector(x, y);
  }
}
, get_Image:function(){
  return this.$Image;
}
, main:function(args){
  {
    var state = new example.CanvasState(getCanvas());
    state.addShape(example.get_Image().splitInPieces().get(0));
    setTimeout(function(){
      {
        state.set_valid(false);
      }
    }
    );
  }
}
, reversed:function(receiver){
  {
    var result = new Kotlin.ArrayList;
    var i = receiver.size();
    while (i > 0) {
      result.add(receiver.get(--i));
    }
    return result;
  }
}
}, {CanvasState:classes.CanvasState, Shape:classes.Shape, Vector:classes.Vector, Piece:classes.Piece});
kotlin.initialize();
example.initialize();

var args = [];
example.main(args);
