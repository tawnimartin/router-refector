var CollectionView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.appendItem);
  },

  render: function() {
    this.$el.empty();
    this.collection.each(this.appendItem, this);
    return this;
  },

  appendItem: function(model) {
    if (!this.itemView) {
      throw new Error("Must specify an item view");
    }

    var view = new this.itemView({model: model});

    model.once("remove", view.remove);

    this.$el.append(view.el);

    view.render();
  }
});

var ProductView = Backbone.View.extend({
  template: JST["product"],
  className: "product",
  renderData: function() {
    var rawdata = this.model.toJSON();
    var data = {};
    data.store = rawdata.Shop.shop_name;
    data.title = rawdata.title;
    data.price = rawdata.price;
    data.image = rawdata.Images[0].url_170x135;
    return data;
  },
  render: function() {
    this.$el.html(
      this.template( this.renderData() )
    );
    return this;
  }
});

var ProductsView = CollectionView.extend({
  itemView: ProductView,
  className: "products"
});

var NavView = Backbone.View.extend({
  events: {
    "click a" : "onClick"
  },
  template: JST["nav"],
  tagName: "nav",
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  showSpinner: function() {
    this.$(".products i").show();
  },
  hideSpinner: function() {
    this.$(".products i").hide();
  },
  onClick: function(e) {
    e.preventDefault();
    //$link = this.$(e.currentTarget);
    // this.trigger("link:click", $link.data("name"));
    var name = this.$(e.currentTarget).data("name");
    var href = this.$(e.currentTarget).attr("href");

    this.trigger("link:click", {
      name: name, 
      href: href
      });
    }
    
    
});

var HomeView = Backbone.View.extend({
  template: JST["home"],
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

var TermsView = Backbone.View.extend({
  template: JST["terms"],
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
