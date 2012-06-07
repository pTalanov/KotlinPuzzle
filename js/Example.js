(function(){
  'use strict';
  var classes = function(){
    var tmp$0 = Kotlin.createClass({initialize:function(first, second){
      this.$first = first;
      this.$second = second;
    }
    , get_first:function(){
      return this.$first;
    }
    , get_second:function(){
      return this.$second;
    }
    });
    var tmp$1 = Kotlin.createClass({initialize:function(x, y){
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
        return (new Kotlin.NumberRange(topLeft.get_x(), topLeft.get_x() + size.get_x() - topLeft.get_x() + 1, false)).contains(this.get_x()) && (new Kotlin.NumberRange(topLeft.get_y(), topLeft.get_y() + size.get_y() - topLeft.get_y() + 1, false)).contains(this.get_y());
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
    var tmp$2 = Kotlin.createClass({initialize:function(i, j, startingPos, imageX, imageY, width, height){
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
      {
        return example.get_PuzzleImage().get(this.get_i() - 1, this.get_j());
      }
    }
    , get_rightNeighbour:function(){
      {
        return example.get_PuzzleImage().get(this.get_i() + 1, this.get_j());
      }
    }
    , get_topNeighbour:function(){
      {
        return example.get_PuzzleImage().get(this.get_i(), this.get_j() - 1);
      }
    }
    , get_bottomNeighbour:function(){
      {
        return example.get_PuzzleImage().get(this.get_i(), this.get_j() + 1);
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
        var leftTop = this.get_pos();
        var leftBottom = this.get_pos().plus(example.v$0(0, this.get_height()));
        var rightTop = this.get_pos().plus(example.v$0(this.get_width(), 0));
        var rightBottom = this.get_pos().plus(example.v$0(this.get_width(), this.get_height()));
        this.drawBorder(context, this.get_leftNeighbour(), true, leftTop, leftBottom);
        this.drawBorder(context, this.get_rightNeighbour(), false, rightTop, rightBottom);
        this.drawBorder(context, this.get_bottomNeighbour(), true, leftBottom, rightBottom);
        this.drawBorder(context, this.get_topNeighbour(), false, leftTop, rightTop);
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
    , drawBorder:function(receiver, neighbour, drawShadow, p1, p2){
      {
        receiver.save();
        this.setLineStyleFor(receiver, neighbour, drawShadow);
        util.strokeLine(receiver, Math.floor(p1.get_x()), Math.floor(p1.get_y()), Math.floor(p2.get_x()), Math.floor(p2.get_y()));
        receiver.restore();
      }
    }
    , drawImagePart:function(state){
      {
        state.get_context().drawImage(example.get_PuzzleImage().get_data(), this.get_imageX(), this.get_imageY(), this.get_width(), this.get_height(), Math.floor(this.get_pos().get_x()), Math.floor(this.get_pos().get_y()), this.get_width(), this.get_height());
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
        var imageDistance = otherPiece.get_indexVector().minus$0(this.get_indexVector()).times(example.get_PuzzleImage().get_pieceSize());
        var realDistance = otherPiece.get_pos().minus$0(this.$pos);
        return realDistance.minus$0(imageDistance);
      }
    }
    });
    var tmp$3 = Kotlin.createClass({initialize:function(x, y){
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
                this.get_all().add(stdlib.pair(i, j));
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
    var tmp$4 = Kotlin.createClass({initialize:function(canvas){
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
                    tmp$0_0.set_dragOff(mousePos.minus$0(shape.get_pos()));
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
              (tmp$1.get_selection() != null?tmp$1.get_selection():Kotlin.throwNPE()).set_pos(tmp$1.mousePos_0(it).minus$0(tmp$1.get_dragOff()));
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
          var el = element != null?element:Kotlin.throwNPE();
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
    var tmp$5 = Kotlin.createClass({initialize:function(){
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
    var tmp$6 = Kotlin.createClass(tmp$5, {initialize:function(mainPiece){
      this.$mainPiece = mainPiece;
      this.super_init();
      this.$selected = false;
      this.$pieces = stdlib.arrayList([this.get_mainPiece()]);
    }
    , get_mainPiece:function(){
      return this.$mainPiece;
    }
    , contains:function(mousePos){
      {
        var tmp$0;
        return stdlib.any(this.get_pieces(), (tmp$0 = this , function(){
          {
            return this.contains(mousePos);
          }
        }
        ));
      }
    }
    , get_pos:function(){
      {
        return this.get_mainPiece().get_pos();
      }
    }
    , set_pos:function(newPos){
      {
        var delta = newPos.minus$0(this.get_pos());
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
        example.set_haveWon(this.get_pieces().size() == example.get_PuzzleImage().get_pieceCount());
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
              piece.set_pos(piece.get_pos().minus$0(alignDelta));
            }
          }
        }
        example.get_canvasState().removeShape(otherBundle);
      }
    }
    });
    return {Shape:tmp$5, Bundle:tmp$6, Vector:tmp$1, Piece:tmp$2, Shuffler:tmp$3, CanvasState:tmp$4, Pair:tmp$0};
  }
  ();
  var example = Kotlin.createNamespace({initialize:function(){
    this.$_canvasState = null;
    this.$PuzzleImage = Kotlin.createObject({initialize:function(){
      this.$width = 800;
      this.$height = 600;
      this.$piecesX = 4;
      this.$piecesY = 3;
      this.$piecesList = new Kotlin.ArrayList;
      this.$pieceSize = this.get_width() / this.get_piecesX();
      this.$pieceCount = this.get_piecesX() * this.get_piecesY();
      this.$pieces = this.splitInPieces();
    }
    , get_data:function(){
      {
        return example.loadImageFromResource('Penguins.jpg');
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
    , get_pieceCount:function(){
      return this.$pieceCount;
    }
    , get_pieces:function(){
      return this.$pieces;
    }
    , get:function(i, j){
      {
        var tmp$0;
        if ((new Kotlin.NumberRange(0, this.get_piecesX() - 1 - 0 + 1, false)).contains(i) && (new Kotlin.NumberRange(0, this.get_piecesY() - 1 - 0 + 1, false)).contains(j)) {
          tmp$0 = this.get_pieces()[i][j];
        }
         else {
          tmp$0 = null;
        }
        return tmp$0;
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
                    var imagePiece = new example.Piece(x, y, example.v$0(xy.get_first() * tmp$0.get_pieceSize(), xy.get_second() * tmp$0.get_pieceSize()), x * tmp$0.get_pieceSize(), y * tmp$0.get_pieceSize(), tmp$0.get_pieceSize(), tmp$0.get_pieceSize());
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
  }
  , main:function(args){
    {
      $(function(){
        {
          var pieces = example.get_PuzzleImage().get_piecesList();
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
  , get__canvasState:function(){
    return this.$_canvasState;
  }
  , set__canvasState:function(tmp$0){
    this.$_canvasState = tmp$0;
  }
  , get_canvasState:function(){
    {
      if (example.get__canvasState() == null) {
        example.set__canvasState(new example.CanvasState(example.get_canvas()));
      }
      return example.get__canvasState() != null?example.get__canvasState():Kotlin.throwNPE();
    }
  }
  , loadImageFromResource:function(path){
    {
      var image = window.document.createElement('img');
      image.src = path;
      return image;
    }
  }
  , get_PuzzleImage:function(){
    return this.$PuzzleImage;
  }
  , get_haveWon:function(){
    return this.$haveWon;
  }
  , set_haveWon:function(won){
    {
      if (won && !this.$haveWon) {
        var logo = window.document.getElementById('logoimage') != null?window.document.getElementById('logoimage'):Kotlin.throwNPE();
        logo.width = 250;
        logo.height = 250;
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
  }, {Shape:classes.Shape, Bundle:classes.Bundle, CanvasState:classes.CanvasState, Shuffler:classes.Shuffler, Piece:classes.Piece, Vector:classes.Vector});
  Kotlin.defs.example = example;
  var util = Kotlin.createNamespace({initialize:function(){
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
  var stdlib = Kotlin.createNamespace({initialize:function(){
  }
  , pair:function(first, second){
    {
      return new stdlib.Pair(first, second);
    }
  }
  , any:function(receiver, predicate){
    {
      var tmp$0;
      {
        tmp$0 = receiver.iterator();
        while (tmp$0.get_hasNext()) {
          var elem = tmp$0.next();
          {
            if (predicate.call(elem)) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }
  , arrayList:function(args){
    {
      var result = new Kotlin.ArrayList;
      var tmp$0;
      var tmp$1;
      var tmp$2;
      {
        tmp$0 = args , tmp$1 = tmp$0.length;
        for (var tmp$2 = 0; tmp$2 != tmp$1; ++tmp$2) {
          var element = tmp$0[tmp$2];
          {
            result.add(element);
          }
        }
      }
      return result;
    }
  }
  }, {Pair:classes.Pair});
  Kotlin.defs.stdlib = stdlib;
  var kotlin = Kotlin.createNamespace({initialize:function(){
  }
  , set:function(receiver, key, value){
    {
      return receiver.put(key, value);
    }
  }
  }, {ranges:Kotlin.createNamespace({initialize:function(){
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
  }, {}), browser:Kotlin.createNamespace({initialize:function(){
  }
  }, {})});
  Kotlin.defs.kotlin = kotlin;
  example.initialize();
  kotlin.ranges.initialize();
  util.initialize();
  stdlib.initialize();
  kotlin.initialize();
}
)();
