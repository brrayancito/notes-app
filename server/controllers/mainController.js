// Get Homepage
exports.homepage = async (req, res) => {
  const locals = {
    title: 'NodeJs Notes',
    description: 'Free NodeJs Notes '
  }

  res.render('index', {
    locals,
    layout: '../views/layouts/front-page.ejs'
  })
}

// Get About
exports.about = async (req, res) => {
  const locals = {
    title: 'About - NodeJs Notes',
    description: 'Free NodeJs Notes '
  }

  res.render('about', locals)
}
