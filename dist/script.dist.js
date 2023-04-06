let pokemonRepository = (function () {
    let t = []
    function e(e) {
      'object' == typeof e && 'name' in e
        ? t.push(e)
        : console.log('pokemon is not correct')
    }
    function n() {
      return t
    }
    function o(t) {
      i(t)
    }
    function p(t) {
      pokemonRepository.loadDetails(t).then(function () {
        var e
        let n, o, p, i, a, l, d, r, s, m, c
        console.log(t),
          (e = t),
          $('.modal'),
          (n = $('.modal-body')),
          $('.modal-dialog'),
          $('.modal-content'),
          (o = $('.modal-header')),
          (p = $('.modal-title')),
          (i = $('.close')),
          $('.modal-footer'),
          p.empty(),
          n.empty(),
          o.empty(),
          (a = $('<h1>#' + e.id + '</h1>')),
          (l = $('<h1>' + e.name + '</h1>')),
          (d = $('<div></div>')),
          (r = $('<img class= "modal-img">')).attr('src', e.imageUrl),
          (s = $('<p>Height : ' + e.height + '</p>')),
          (m = $('<p>Weight : ' + e.weight + '</p>')),
          (c = $('<p>Type : ' + e.type + '</p>')),
          o.append(a),
          o.append(p),
          o.append(i),
          p.append(l),
          n.append(r),
          d.append(s),
          d.append(m),
          d.append(c),
          n.append(d)
      })
    }
    function i(t) {
      let e = $('.list-group'),
        n = $('<li></li>')
      n.addClass('list-group-item')
      let o = $('<button>').attr({
        'data-toggle': 'modal',
        'data-target': '#modal-container',
      })
      o.addClass('btn btn-lg btn-link')
      let i = document.createTextNode(t.name)
      e.append(n),
        n.append(o),
        o.append(i),
        n.on('click', function () {
          p(t)
        })
    }
    return {
      add: e,
      getAll: n,
      addListItem: o,
      showDetails: p,
      appEventListener: i,
      loadList: function t() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
          .then(function (t) {
            return t.json()
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              e({
                name: t.name,
                detailsUrl: t.url,
                weight: t.weight,
                typeOne: t.typeOne,
                typetwo: t.typeTwo,
                type: t.type,
                id: t.id,
              })
            })
          })
          .catch(function (t) {
            console.error(t)
          })
      },
      loadDetails: function t(e) {
        return fetch(e.detailsUrl)
          .then(function (t) {
            return t.json()
          })
          .then(function (t) {
            ;(e.imageUrl = t.sprites.front_default),
              (e.height = t.height),
              (e.weight = t.weight),
              (e.id = t.id),
              (dataType = t.types).length > 1
                ? ((e.typeOne = t.types[0].type.name),
                  (e.typeTwo = t.types[1].type.name))
                : ((e.typeOne = t.types[0].type.name),
                  (e.typeTwo = ''),
                  (e.type = e.typeOne)),
              (e.type = e.typeOne + ' ' + e.typeTwo)
          })
          .catch(function (t) {
            console.error(t)
          })
      },
    }
  })(),
  pokemonList = pokemonRepository.getAll()
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (t) {
    pokemonRepository.addListItem(t)
  })
}),
  console.log(pokemonRepository.getAll()),
  console.log(pokemonList.length)
