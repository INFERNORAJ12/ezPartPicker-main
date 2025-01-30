const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files (CSS, images)
app.use(cookieParser()); // Enable cookies

// Load PC Builds from JSON
const getBuilds = () => JSON.parse(fs.readFileSync('data/builds.json', 'utf-8'));

// Home Page - Recommended PC Builds
app.get('/', (req, res) => {
    const builds = getBuilds();
    const user = req.cookies.user || null; // Check for user login cookie
    res.render('index', { recommendedBuilds: builds, user });
});

// PC Build Details Page
app.get('/build/:id', (req, res) => {
    const builds = getBuilds();
    const build = builds.find(b => b.id === req.params.id);

    if (build) {
        res.render('build-details', { build });
    } else {
        res.status(404).send("Build not found");
    }
});

// Login Page
app.get('/login', (req, res) => {
    if (req.cookies.user) {
        return res.redirect('/');
    }
    res.render('login');
});

// Sign-up Page
app.get('/signin', (req, res) => {
    if (req.cookies.user) {
        return res.redirect('/');
    }
    res.render('signin');
});

// Simulated Login (For Now)
app.post('/login', (req, res) => {
    res.cookie('user', JSON.stringify({ name: "Gamer" }), { maxAge: 3600000 });
    res.redirect('/');
});

// Simulated Logout
app.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

app.get('/guide', (req, res) => {
    res.render('guide');  
})

app.get('/about', (req, res) => {
    res.render('about');  
})

app.get('/contact', (req, res) => {
  res.render('guide');  
})

app.get('/your-build', (req, res) => {
  res.render('your-build');  
})
app.get('/AI-build', (req, res) => {
  res.render('AI-build');  
})
app.get('/Component', (req, res) => {
  res.render('Component');  
})

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Pass`));
