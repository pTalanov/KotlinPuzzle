var classes = function(){
  var tmp$0 = Kotlin.Class.create({initialize:function(canvas){
    this.$canvas = canvas;
    this.$width = this.get_canvas().width;
    this.$height = this.get_canvas().height;
    this.$context = getContext();
    this.$valid = false;
    this.$shapes = new Kotlin.ArrayList;
    this.$selection = null;
    this.$dragOff = new example.Vector(0, 0);
    this.$interval = 1000 / 50;
    {
      var tmp$0_0;
      $(this.get_canvas()).mousedown((tmp$0_0 = this , function(it){
        {
          tmp$0_0.set_valid(false);
          tmp$0_0.set_selection(null);
          var mousePos = tmp$0_0.mousePos_0(it);
          var tmp$0;
          {
            tmp$0 = kotlin.ranges.reversed(tmp$0_0.get_shapes()).iterator();
            while (tmp$0.hasNext()) {
              var shape = tmp$0.next();
              {
                if (shape.contains(mousePos)) {
                  tmp$0_0.set_dragOff(mousePos.minus(shape.get_pos()));
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
            Kotlin.sure(tmp$1.get_selection()).set_pos(tmp$1.mousePos_0(it).minus(tmp$1.get_dragOff()));
            tmp$1.set_valid(false);
          }
        }
      }
      ));
      var tmp$2;
      $(this.get_canvas()).mouseup((tmp$2 = this , function(it){
        {
          var tmp$0;
          tmp$0 = tmp$2.get_selection() , tmp$0 != null?tmp$0.set_selected(false):null;
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
      return (new example.Vector(e.pageX, e.pageY)).minus(offset);
    }
  }
  , addShape:function(shape){
    {
      this.get_shapes().add(shape);
      this.set_valid(false);
    }
  }
  , removeShape:function(shape){
    {
      this.get_shapes().remove(shape);
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
        tmp$0 = this.get_shapes().iterator();
        while (tmp$0.hasNext()) {
          var shape = tmp$0.next();
          {
            shape.draw(this);
          }
        }
      }
      var tmp$1;
      tmp$1 = this.get_selection() , tmp$1 != null?tmp$1.draw(this):null;
      this.set_valid(true);
    }
  }
  });
  var tmp$1 = Kotlin.Class.create({initialize:function(){
    this.$selected_0 = false;
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
    return this.$selected_0;
  }
  , set_selected:function(tmp$0){
    this.$selected_0 = tmp$0;
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
  var tmp$2 = Kotlin.Class.create(tmp$1, {initialize:function(i, j, startingPos, imageX, imageY, width, height){
    this.$i = i;
    this.$j = j;
    this.$imageX = imageX;
    this.$imageY = imageY;
    this.$width = width;
    this.$height = height;
    this.super_init();
    this.$pos = startingPos;
    this.$bundle = new example.Bundle(this);
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
  , get_bundle:function(){
    return this.$bundle;
  }
  , set_bundle:function(tmp$0){
    this.$bundle = tmp$0;
  }
  , contains:function(mousePos){
    {
      return mousePos.isInRect(this.get_pos(), example.v$0(this.get_width(), this.get_height()));
    }
  }
  , draw:function(state){
    {
      this.drawImagePart(state);
      this.drawBorders(state);
    }
  }
  , drawBorders:function(state){
    {
      var context = state.get_context();
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
      context.strokeRect(Math.floor(this.get_pos().get_x()), Math.floor(this.get_pos().get_y()), this.get_width(), this.get_height());
    }
  }
  , drawImagePart:function(state){
    {
      var tmp$0;
      this.shadowed(state.get_context(), example.v$0(1, 1), 0.8, (tmp$0 = this , function(){
        {
          this.drawImage(example.get_Image().get_data(), tmp$0.get_imageX(), tmp$0.get_imageY(), tmp$0.get_width(), tmp$0.get_height(), Math.floor(tmp$0.get_pos().get_x()), Math.floor(tmp$0.get_pos().get_y()), tmp$0.get_width(), tmp$0.get_height());
        }
      }
      ));
    }
  }
  , get_indexVector:function(){
    {
      return example.v(this.get_i(), this.get_j());
    }
  }
  , neighbours:function(){
    {
      var result = new Kotlin.ArrayList;
      if (this.get_i() > 0) {
        result.add(example.get_Image().get_pieces()[this.get_i() - 1][this.get_j()]);
      }
      if (this.get_j() > 0) {
        result.add(example.get_Image().get_pieces()[this.get_i()][this.get_j() - 1]);
      }
      if (this.get_i() < example.get_Image().get_piecesX() - 2) {
        result.add(example.get_Image().get_pieces()[this.get_i() + 1][this.get_j()]);
      }
      if (this.get_j() < example.get_Image().get_piecesY() - 2) {
        result.add(example.get_Image().get_pieces()[this.get_i()][this.get_j() + 1]);
      }
      return result;
    }
  }
  , alignDelta:function(otherPiece){
    {
      var imageDistance = otherPiece.get_indexVector().minus(this.get_indexVector()).times(example.get_Image().get_pieceSize());
      var realDistance = otherPiece.get_pos().minus(this.get_pos());
      return realDistance.minus(imageDistance);
    }
  }
  });
  var tmp$3 = Kotlin.Class.create(tmp$1, {initialize:function(mainPiece){
    this.$mainPiece = mainPiece;
    this.super_init();
    this.$selected = false;
    this.$pieces = new Kotlin.ArrayList;
    {
      this.get_pieces().add(this.get_mainPiece());
    }
  }
  , get_mainPiece:function(){
    return this.$mainPiece;
  }
  , contains:function(mousePos){
    {
      var tmp$0;
      {
        tmp$0 = this.get_pieces().iterator();
        while (tmp$0.hasNext()) {
          var piece = tmp$0.next();
          {
            if (piece.contains(mousePos)) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }
  , get_pos:function(){
    {
      return this.get_mainPiece().get_pos();
    }
  }
  , set_pos:function(newPos){
    {
      var delta = newPos.minus(this.get_pos());
      var tmp$0;
      {
        tmp$0 = this.get_pieces().iterator();
        while (tmp$0.hasNext()) {
          var piece = tmp$0.next();
          {
            piece.set_pos(piece.get_pos().plus(delta));
          }
        }
      }
    }
  }
  , get_selected:function(){
    return this.$selected;
  }
  , set_selected:function(newVal){
    {
      this.$selected = newVal;
      if (!this.get_selected()) {
        var tmp$0;
        {
          tmp$0 = this.get_pieces().iterator();
          while (tmp$0.hasNext()) {
            var piece = tmp$0.next();
            {
              this.mergeNeighbours(piece);
            }
          }
        }
      }
    }
  }
  , mergeNeighbours:function(piece){
    {
      var tmp$0;
      {
        tmp$0 = piece.neighbours().iterator();
        while (tmp$0.hasNext()) {
          var neighbour = tmp$0.next();
          {
            var alignDelta = piece.alignDelta(neighbour);
            if (alignDelta.get_sqr() < 30) {
              if (neighbour.get_bundle() != this) {
                this.merge(neighbour.get_bundle(), alignDelta);
              }
            }
          }
        }
      }
    }
  }
  , draw:function(state){
    {
      var tmp$0;
      {
        tmp$0 = this.get_pieces().iterator();
        while (tmp$0.hasNext()) {
          var piece = tmp$0.next();
          {
            piece.draw(state);
          }
        }
      }
    }
  }
  , get_pieces:function(){
    return this.$pieces;
  }
  , merge:function(otherBundle, alignDelta){
    {
      var tmp$0;
      {
        tmp$0 = otherBundle.get_pieces().iterator();
        while (tmp$0.hasNext()) {
          var piece = tmp$0.next();
          {
            this.get_pieces().add(piece);
            piece.set_bundle(this);
            piece.set_pos(piece.get_pos().minus(alignDelta));
          }
        }
      }
      example.get_canvasState().removeShape(otherBundle);
    }
  }
  });
  var tmp$4 = Kotlin.Class.create({initialize:function(x, y){
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
      return example.v$0(this.get_x() + v.get_x(), this.get_y() + v.get_y());
    }
  }
  , minus$0:function(){
    {
      return example.v$0(-this.get_x(), -this.get_y());
    }
  }
  , minus:function(v){
    {
      return example.v$0(this.get_x() - v.get_x(), this.get_y() - v.get_y());
    }
  }
  , times:function(koef){
    {
      return example.v$0(this.get_x() * koef, this.get_y() * koef);
    }
  }
  , distanceTo:function(v){
    {
      return Math.sqrt(this.minus(v).get_sqr());
    }
  }
  , rotatedBy:function(theta){
    {
      var sin = Math.sin(theta);
      var cos = Math.cos(theta);
      return example.v$0(this.get_x() * cos - this.get_y() * sin, this.get_x() * sin + this.get_y() * cos);
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
  return {Shape:tmp$1, Piece:tmp$2, Bundle:tmp$3, Vector:tmp$4, CanvasState:tmp$0};
}
();
var kotlin = Kotlin.Namespace.create({initialize:function(){
}
, set:function(receiver, key, value){
  {
    return receiver.put(key, value);
  }
}
}, {ranges:Kotlin.Namespace.create({initialize:function(){
}
, shuffled:function(receiver){
  {
    var ordered = new Kotlin.ArrayList;
    var tmp$0;
    var tmp$1;
    var tmp$2;
    var tmp$3;
    {
      tmp$0 = receiver , (tmp$1 = tmp$0.get_reversed()?-1:1 , (tmp$2 = tmp$0.get_start() , tmp$3 = tmp$0.get_end() + tmp$1));
      for (var i = tmp$2; i != tmp$3; i += tmp$1) {
        ordered.add(i);
      }
    }
    return Kotlin.arrayFromFun(ordered.size(), function(it){
      {
        var randomValue = Math.floor((ordered.size() - 1) * Math.random());
        var value = ordered.get(randomValue);
        ordered.remove(value);
        return value;
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
}, {})});
var example = Kotlin.Namespace.create({initialize:function(){
  this.$Image = Kotlin.object.create({initialize:function(){
    this.$width = 1024;
    this.$height = 768;
    this.$piecesX = 8;
    this.$piecesY = 6;
    this.$piecesList = new Kotlin.ArrayList;
    this.$pieceSize = this.get_width() / this.get_piecesX();
    this.$pieces = this.splitInPieces();
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
  , get_piecesX:function(){
    return this.$piecesX;
  }
  , get_piecesY:function(){
    return this.$piecesY;
  }
  , get_piecesList:function(){
    return this.$piecesList;
  }
  , get_pieceSize:function(){
    return this.$pieceSize;
  }
  , get_pieces:function(){
    return this.$pieces;
  }
  , splitInPieces:function(){
    {
      var xRange = new Kotlin.NumberRange(0, this.get_piecesX() - 1 - 0 + 1, false);
      var xShuffled = kotlin.ranges.shuffled(xRange);
      var yRange = new Kotlin.NumberRange(0, this.get_piecesY() - 1 - 0 + 1, false);
      var yShuffled = kotlin.ranges.shuffled(yRange);
      var tmp$0_0;
      return Kotlin.arrayFromFun(this.get_piecesX(), (tmp$0_0 = this , function(x){
        {
          var tmp$0;
          return Kotlin.arrayFromFun(tmp$0_0.get_piecesY(), (tmp$0 = tmp$0_0 , function(y){
            {
              var imagePiece = new example.Piece(x, y, example.v(xShuffled[x] * tmp$0.get_pieceSize(), yShuffled[y] * tmp$0.get_pieceSize()), x * tmp$0.get_pieceSize(), y * tmp$0.get_pieceSize(), tmp$0.get_pieceSize(), tmp$0.get_pieceSize());
              tmp$0.get_piecesList().add(imagePiece);
              return imagePiece;
            }
          }
          ));
        }
      }
      ));
    }
  }
  });
  this.$canvasState = new example.CanvasState(getCanvas());
}
, get_Image:function(){
  return this.$Image;
}
, v$0:function(x, y){
  {
    return new example.Vector(x, y);
  }
}
, v:function(x, y){
  {
    return new example.Vector(x, y);
  }
}
, main:function(args){
  {
    var pieces = example.get_Image().get_piecesList();
    var tmp$0;
    {
      tmp$0 = pieces.iterator();
      while (tmp$0.hasNext()) {
        var piece = tmp$0.next();
        {
          example.get_canvasState().addShape(piece.get_bundle());
        }
      }
    }
    setInterval(function(){
      {
        example.get_canvasState().set_valid(false);
      }
    }
    , 1000);
  }
}
, get_canvasState:function(){
  return this.$canvasState;
}
}, {Vector:classes.Vector, Bundle:classes.Bundle, Shape:classes.Shape, Piece:classes.Piece, CanvasState:classes.CanvasState});
kotlin.initialize();
example.initialize();
kotlin.ranges.initialize();

var args = [];
example.main(args);
