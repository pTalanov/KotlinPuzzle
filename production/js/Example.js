(function(){
  'use strict';
  var classes = function(){
    var tmp$0 = Kotlin.createClass({initialize:function(i, j, startingPos, imageX, imageY, width, height){
      this.$i = i;
      this.$j = j;
      this.$imageX = imageX;
      this.$imageY = imageY;
      this.$width = width;
      this.$height = height;
      this.$shadowOffset = example.v(-4, 4);
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
    , get_shadowOffset:function(){
      return this.$shadowOffset;
    }
    , get_pos:function(){
      var tmp$0;
      if (this.get_bundle().get_selected())
        tmp$0 = this.$pos;
      else 
        tmp$0 = this.$pos.plus(this.get_shadowOffset());
      {
        return tmp$0;
      }
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
    , get_leftNeighbour:function(){
      var tmp$0;
      if (this.get_i() > 0)
        tmp$0 = example.get_Image().get_pieces()[this.get_i() - 1][this.get_j()];
      else 
        tmp$0 = null;
      {
        return tmp$0;
      }
    }
    , get_rightNeighbour:function(){
      var tmp$0;
      if (this.get_i() < example.get_Image().get_piecesX() - 1)
        tmp$0 = example.get_Image().get_pieces()[this.get_i() + 1][this.get_j()];
      else 
        tmp$0 = null;
      {
        return tmp$0;
      }
    }
    , get_topNeighbour:function(){
      var tmp$0;
      if (this.get_j() > 0)
        tmp$0 = example.get_Image().get_pieces()[this.get_i()][this.get_j() - 1];
      else 
        tmp$0 = null;
      {
        return tmp$0;
      }
    }
    , get_bottomNeighbour:function(){
      var tmp$0;
      if (this.get_j() < example.get_Image().get_piecesY() - 1)
        tmp$0 = example.get_Image().get_pieces()[this.get_i()][this.get_j() + 1];
      else 
        tmp$0 = null;
      {
        return tmp$0;
      }
    }
    , contains:function(mousePos){
      {
        return mousePos.isInRect(this.get_pos(), example.v(this.get_width(), this.get_height()));
      }
    }
    , drawBorders:function(state){
      {
        var context = state.get_context();
        var tmp$0;
        this.drawBorder(context, this.get_leftNeighbour(), true, (tmp$0 = this , function(){
          {
            util.strokeLine(this, Math.floor(tmp$0.get_pos().get_x()), Math.floor(tmp$0.get_pos().get_y()), Math.floor(tmp$0.get_pos().get_x()), Math.floor(tmp$0.get_pos().get_y()) + tmp$0.get_height());
          }
        }
        ));
        var tmp$1;
        this.drawBorder(context, this.get_rightNeighbour(), false, (tmp$1 = this , function(){
          {
            util.strokeLine(this, Math.floor(tmp$1.get_pos().get_x()) + tmp$1.get_width(), Math.floor(tmp$1.get_pos().get_y()), Math.floor(tmp$1.get_pos().get_x()) + tmp$1.get_width(), Math.floor(tmp$1.get_pos().get_y()) + tmp$1.get_height());
          }
        }
        ));
        var tmp$2;
        this.drawBorder(context, this.get_bottomNeighbour(), true, (tmp$2 = this , function(){
          {
            util.strokeLine(this, Math.floor(tmp$2.get_pos().get_x()), Math.floor(tmp$2.get_pos().get_y()) + tmp$2.get_height(), Math.floor(tmp$2.get_pos().get_x()) + tmp$2.get_width(), Math.floor(tmp$2.get_pos().get_y()) + tmp$2.get_height());
          }
        }
        ));
        var tmp$3;
        this.drawBorder(context, this.get_topNeighbour(), false, (tmp$3 = this , function(){
          {
            util.strokeLine(this, Math.floor(tmp$3.get_pos().get_x()), Math.floor(tmp$3.get_pos().get_y()), Math.floor(tmp$3.get_pos().get_x()) + tmp$3.get_width(), Math.floor(tmp$3.get_pos().get_y()));
          }
        }
        ));
      }
    }
    , setLineStyleFor:function(receiver, neighbour, shadow){
      {
        var tmp$0;
        if ((tmp$0 = neighbour , tmp$0 != null?tmp$0.get_bundle():null) == this.get_bundle()) {
          receiver.strokeStyle = '#FFFFFF';
          receiver.lineWidth = 2;
        }
         else {
          if (shadow && this.get_bundle() == example.get_canvasState().get_selection()) {
            receiver.shadowColor = 'rgba(100, 100, 100, 0.9)';
            receiver.shadowBlur = 4;
            receiver.shadowOffsetX = this.get_shadowOffset().get_x();
            receiver.shadowOffsetY = this.get_shadowOffset().get_y();
          }
          receiver.strokeStyle = '#000000';
          receiver.lineWidth = 4;
        }
      }
    }
    , drawBorder:function(receiver, neighbour, drawShadow, drawLine){
      {
        receiver.save();
        this.setLineStyleFor(receiver, neighbour, drawShadow);
        drawLine.call(receiver);
        receiver.restore();
      }
    }
    , drawImagePart:function(state){
      {
        state.get_context().drawImage(example.get_Image().get_data(), this.get_imageX(), this.get_imageY(), this.get_width(), this.get_height(), Math.floor(this.get_pos().get_x()), Math.floor(this.get_pos().get_y()), this.get_width(), this.get_height());
      }
    }
    , get_indexVector:function(){
      {
        return example.v$0(this.get_i(), this.get_j());
      }
    }
    , neighbours:function(){
      {
        var result = new Kotlin.ArrayList;
        result.add(this.get_leftNeighbour());
        result.add(this.get_topNeighbour());
        result.add(this.get_bottomNeighbour());
        result.add(this.get_rightNeighbour());
        return result;
      }
    }
    , alignDelta:function(otherPiece){
      {
        var imageDistance = otherPiece.get_indexVector().minus(this.get_indexVector()).times(example.get_Image().get_pieceSize());
        var realDistance = otherPiece.get_pos().minus(this.$pos);
        return realDistance.minus(imageDistance);
      }
    }
    });
    var tmp$1 = Kotlin.createClass({initialize:function(){
      this.$selected_0 = false;
    }
    , draw:function(state){
    }
    , contains:function(mousePos){
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_selected:function(){
      return this.$selected_0;
    }
    , set_selected:function(tmp$0){
      this.$selected_0 = tmp$0;
    }
    });
    var tmp$2 = Kotlin.createClass(tmp$1, {initialize:function(mainPiece){
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
          while (tmp$0.get_hasNext()) {
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
          while (tmp$0.get_hasNext()) {
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
            while (tmp$0.get_hasNext()) {
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
          while (tmp$0.get_hasNext()) {
            var neighbour = tmp$0.next();
            {
              if (neighbour == null) {
                continue;
              }
              var alignDelta = piece.alignDelta(neighbour);
              if (alignDelta.get_sqr() < 60) {
                if (neighbour.get_bundle() != this) {
                  this.merge(neighbour.get_bundle(), alignDelta);
                }
              }
            }
          }
        }
        example.set_haveWon(this.get_pieces().size() == example.get_Image().get_piecesCount());
      }
    }
    , draw:function(state){
      {
        var tmp$0;
        {
          tmp$0 = this.get_pieces().iterator();
          while (tmp$0.get_hasNext()) {
            var piece = tmp$0.next();
            {
              piece.drawImagePart(state);
              piece.drawBorders(state);
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
          while (tmp$0.get_hasNext()) {
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
    var tmp$3 = Kotlin.createClass({initialize:function(canvas){
      this.$canvas = canvas;
      this.$width = this.get_canvas().width;
      this.$height = this.get_canvas().height;
      this.$context = this.get_canvas().getContext('2d') != null?this.get_canvas().getContext('2d'):Kotlin.throwNPE();
      this.$valid = false;
      this.$shapes = new Kotlin.ArrayList;
      this.$selection = null;
      this.$dragOff = new example.Vector(0, 0);
      this.$interval = 1000 / 50;
      {
        var tmp$0_0;
        $(this.get_canvas()).mousedown((tmp$0_0 = this , function(it){
          {
            tmp$0_0.unsetSelection();
            var mousePos = tmp$0_0.mousePos_0(it);
            var tmp$0;
            {
              tmp$0 = kotlin.ranges.reversed(tmp$0_0.get_shapes()).iterator();
              while (tmp$0.get_hasNext()) {
                var shape = tmp$0.next();
                {
                  if (shape.contains(mousePos)) {
                    tmp$0_0.set_dragOff(mousePos.minus(shape.get_pos()));
                    shape.set_selected(true);
                    tmp$0_0.set_selection(shape);
                    tmp$0_0.removeShape(shape);
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
            tmp$2.unsetSelection();
          }
        }
        ));
        var tmp$3;
        window.setInterval((tmp$3 = this , function(){
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
    , get_height:function(){
      return this.$height;
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
    , unsetSelection:function(){
      {
        var sel = this.get_selection();
        if (sel != null) {
          sel.set_selected(false);
          this.addShape(sel);
        }
        this.set_selection(null);
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
          while (tmp$0.get_hasNext()) {
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
    var tmp$4 = Kotlin.createClass({initialize:function(x, y){
      this.$x = x;
      this.$y = y;
      this.$all = new Kotlin.ArrayList;
      {
        var tmp$0;
        {
          tmp$0 = this.get_x() - 1 + 1;
          for (var i = 0; i != tmp$0; ++i) {
            var tmp$1;
            {
              tmp$1 = this.get_y() - 1 + 1;
              for (var j = 0; j != tmp$1; ++j) {
                this.get_all().add([i, j]);
              }
            }
          }
        }
      }
    }
    , get_x:function(){
      return this.$x;
    }
    , get_y:function(){
      return this.$y;
    }
    , get_all:function(){
      return this.$all;
    }
    , getNextPair:function(){
      {
        var randomValue = Math.floor((this.get_all().size() - 1) * Math.random());
        var value = this.get_all().get(randomValue);
        this.get_all().remove(value);
        return value;
      }
    }
    });
    var tmp$5 = Kotlin.createClass({initialize:function(x, y){
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
    , minus$0:function(){
      {
        return example.v(-this.get_x(), -this.get_y());
      }
    }
    , minus:function(v){
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
        return Math.sqrt(this.minus(v).get_sqr());
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
    return {Vector:tmp$5, Shape:tmp$1, Bundle:tmp$2, CanvasState:tmp$3, Shuffler:tmp$4, Piece:tmp$0};
  }
  ();
  var util = Kotlin.createNamespace({initialize:function(){
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
  , strokeLine:function(receiver, x1, y1, x2, y2){
    {
      receiver.beginPath();
      receiver.moveTo(x1, y1);
      receiver.lineTo(x2, y2);
      receiver.stroke();
    }
  }
  }, {});
  Kotlin.defs.util = util;
  var example = Kotlin.createNamespace({initialize:function(){
    this.$Image = Kotlin.createObject({initialize:function(){
      this.$width = 1024;
      this.$height = 768;
      this.$piecesX = 4;
      this.$piecesY = 3;
      this.$piecesList = new Kotlin.ArrayList;
      this.$pieceSize = this.get_width() / this.get_piecesX();
      this.$pieces = this.splitInPieces();
    }
    , get_data:function(){
      {
        return example.getImage('Penguins.jpg');
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
    , get_piecesCount:function(){
      {
        return this.get_piecesX() * this.get_piecesY();
      }
    }
    , splitInPieces:function(){
      {
        var shuffler = new example.Shuffler(this.get_piecesX(), this.get_piecesY());
        var tmp$0_0;
        return Kotlin.arrayFromFun(this.get_piecesX(), function(shuffler, tmp$0_0){
          return function(x){
            {
              var tmp$0;
              return Kotlin.arrayFromFun(tmp$0_0.get_piecesY(), function(shuffler, tmp$0){
                return function(y){
                  {
                    var xy = shuffler.getNextPair();
                    var imagePiece = new example.Piece(x, y, example.v$0(xy[0] * tmp$0.get_pieceSize(), xy[1] * tmp$0.get_pieceSize()), x * tmp$0.get_pieceSize(), y * tmp$0.get_pieceSize(), tmp$0.get_pieceSize(), tmp$0.get_pieceSize());
                    tmp$0.get_piecesList().add(imagePiece);
                    return imagePiece;
                  }
                }
                ;
              }
              (shuffler, tmp$0_0));
            }
          }
          ;
        }
        (shuffler, this));
      }
    }
    });
    this.$haveWon = false;
    this.$_canvasState = null;
  }
  , getImage:function(path){
    {
      var image = window.document.createElement('img');
      image.src = path;
      return image;
    }
  }
  , get_Image:function(){
    return this.$Image;
  }
  , get_haveWon:function(){
    return this.$haveWon;
  }
  , set_haveWon:function(won){
    {
      if (won && !this.$haveWon) {
        var canvasDiv = window.document.getElementById('logo') != null?window.document.getElementById('logo'):Kotlin.throwNPE();
        canvasDiv.innerHTML = '<p>Congratulations!<br/>Click on the logo!<br/>' + canvasDiv.innerHTML;
      }
      this.$haveWon = won;
    }
  }
  , v:function(x, y){
    {
      return new example.Vector(x, y);
    }
  }
  , v$0:function(x, y){
    {
      return new example.Vector(x, y);
    }
  }
  , main:function(args){
    {
      $(function(){
        {
          var pieces = example.get_Image().get_piecesList();
          var tmp$0;
          {
            tmp$0 = pieces.iterator();
            while (tmp$0.get_hasNext()) {
              var piece = tmp$0.next();
              {
                example.get_canvasState().addShape(piece.get_bundle());
              }
            }
          }
          window.setInterval(function(){
            {
              example.get_canvasState().set_valid(false);
            }
          }
          , 1000);
        }
      }
      );
    }
  }
  , get_canvas:function(){
    {
      return window.document.getElementsByTagName('canvas').item(0) != null?window.document.getElementsByTagName('canvas').item(0):Kotlin.throwNPE();
    }
  }
  , get_canvasState:function(){
    {
      if (example.get__canvasState() == null) {
        example.set__canvasState(new example.CanvasState(example.get_canvas()));
      }
      return example.get__canvasState() != null?example.get__canvasState():Kotlin.throwNPE();
    }
  }
  , get__canvasState:function(){
    return this.$_canvasState;
  }
  , set__canvasState:function(tmp$0){
    this.$_canvasState = tmp$0;
  }
  }, {Vector:classes.Vector, Shuffler:classes.Shuffler, CanvasState:classes.CanvasState, Bundle:classes.Bundle, Shape:classes.Shape, Piece:classes.Piece});
  Kotlin.defs.example = example;
  var kotlin = Kotlin.createNamespace({initialize:function(){
  }
  , set:function(receiver, key, value){
    {
      return receiver.put(key, value);
    }
  }
  }, {browser:Kotlin.createNamespace({initialize:function(){
  }
  }, {}), ranges:Kotlin.createNamespace({initialize:function(){
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
  Kotlin.defs.kotlin = kotlin;
  util.initialize();
  example.initialize();
  kotlin.ranges.initialize();
  kotlin.initialize();
}
)();

