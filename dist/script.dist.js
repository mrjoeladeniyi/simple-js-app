let pokemonRepository = (function () {
    let e = []
    function t(t) {
      'object' == typeof t && 'name' in t
        ? e.push(t)
        : console.log('pokemon is not correct')
    }
    function n() {
      return e
    }
    function o(e) {
      i(e)
    }
    function p(e) {
      pokemonRepository.loadDetails(e).then(function () {
        var t
        let n, o, p, i, a, l, d, r, s, c, m
        console.log(e),
          (t = e),
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
          (a = $('<h1>#' + t.id + '</h1>')),
          (l = $('<h1>' + t.name + '</h1>')),
          (d = $('<div></div>')),
          (r = $('<img class= "modal-img">')).attr('src', t.imageUrl),
          (s = $('<p>Height : ' + t.height + '</p>')),
          (c = $('<p>Weight : ' + t.weight + '</p>')),
          (m = $('<p>Type : ' + t.type + '</p>')),
          o.append(a),
          o.append(p),
          o.append(i),
          p.append(l),
          n.append(r),
          d.append(s),
          d.append(c),
          d.append(m),
          n.append(d)
      })
    }
    function i(e) {
      let t = $('.list-group'),
        n = $('<li></li>')
      n.addClass('list-group-item')
      let o = $('<button>').attr({
        'data-toggle': 'modal',
        'data-target': '#modal-container',
      })
      o.addClass('btn btn-lg btn-link')
      let i = document.createTextNode(e.name)
      t.append(n),
        n.append(o),
        o.append(i),
        n.on('click', function () {
          p(e)
        })
    }
    function a() {
      $('#skeleton-container').show()
    }
    function l() {
      $('#skeleton-container').hide()
    }
    return {
      add: t,
      getAll: n,
      addListItem: o,
      showDetails: p,
      appEventListener: i,
      loadList: function e() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
          .then(function (e) {
            return a(), e.json()
          })
          .then(function (e) {
            l(),
              e.results.forEach(function (e) {
                t({
                  name: e.name,
                  detailsUrl: e.url,
                  weight: e.weight,
                  typeOne: e.typeOne,
                  typetwo: e.typeTwo,
                  type: e.type,
                  id: e.id,
                })
              })
          })
          .catch(function (e) {
            console.error(e)
          })
      },
      loadDetails: function e(t) {
        return fetch(t.detailsUrl)
          .then(function (e) {
            return e.json()
          })
          .then(function (e) {
            ;(t.imageUrl = e.sprites.front_default),
              (t.height = e.height),
              (t.weight = e.weight),
              (t.id = e.id),
              (dataType = e.types).length > 1
                ? ((t.typeOne = e.types[0].type.name),
                  (t.typeTwo = e.types[1].type.name))
                : ((t.typeOne = e.types[0].type.name),
                  (t.typeTwo = ''),
                  (t.type = t.typeOne)),
              (t.type = t.typeOne + ' ' + t.typeTwo)
          })
          .catch(function (e) {
            console.error(e)
          })
      },
      loadingScreen: a,
      hideScreen: l,
    }
  })(),
  pokemonList = pokemonRepository.getAll()
pokemonRepository.loadList().then(function () {
  pokemonList.forEach(function (e) {
    pokemonRepository.addListItem(e)
  })
}),
  console.log(pokemonRepository.getAll()),
  console.log(pokemonList.length)
