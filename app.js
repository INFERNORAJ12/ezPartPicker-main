const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const { prototype } = require('events');

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
  res.render('contact');  
})

app.get('/your-build', (req, res) => {
  res.render('your-build');  
})
app.get('/AI-build', (req, res) => {
  amount= req.query.amount
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    } = require("@google/generative-ai");
    
    const apiKey = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `you will only list out the parts of  the pc with there full brand name like for example i5 12400f, ryzen 5 5500, etc with there price and also make sure that the parts are compatible and if no gpu can be fit for the budget then add a cpu which has an intergrated graphics . with there brand name like asus, msi, gigabyte etc, and nothing else like the explation is not needed,pc should include a cpu,motherboard, ram, storage,case, psu and only add gpu if it fits the budget. i want a pc for under or exactly equal to ${amount}`,
    });
    
    const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    };
    
    async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "25000rs\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for under or equal to ₹25,000, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600G  ₹12,000\n*   *Motherboard:* MSI A520M-A PRO  ₹5,000\n*   *RAM:* Crucial 8GB DDR4 3200MHz  ₹2,000\n*   *Storage:* Western Digital 250GB NVMe SSD  ₹2,500\n*   *Case:* Ant Esports ICE-120 TG ₹2000\n*   *PSU:* Corsair CV450 450W ₹3,500\n\n*Total: ₹27,000\n\nNote*\nUnfortunately, a build within this budget and with the requirement of new parts will exceed your maximum limit. To stay close to the 25000rs, I had to slightly exceed.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "30000rs"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for under or equal to ₹30,000, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600G ₹12,000\n*   *Motherboard:* MSI A520M-A PRO ₹5,000\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz ₹4000\n*   *Storage:* Western Digital 500GB NVMe SSD ₹3,500\n*   *Case:* Cooler Master MasterBox K501L ₹3,500\n*   *PSU:* Corsair CV450 450W ₹3,500\n\n*Total: ₹31,500\n\nNote*\nUnfortunately, a build within this budget and with the requirement of new parts will exceed your maximum limit. To stay close to the 30000rs, I had to slightly exceed.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "35000rs"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for under or equal to ₹35,000, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600G ₹12,000\n*   *Motherboard:* MSI B450M PRO-VDH MAX ₹6,500\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz ₹4,000\n*   *Storage:* Western Digital 500GB NVMe SSD ₹3,500\n*   *Case:* Cooler Master MasterBox K501L ₹3,500\n*   *PSU:* Corsair CV550 550W ₹4,500\n\n*Total: ₹34,000*\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "70000rs"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for under or equal to ₹70,000, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600 ₹15,000\n*   *Motherboard:* MSI B550M PRO-VDH WIFI ₹11,000\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz ₹4,000\n*  *GPU:*  AMD Radeon RX 6600 ₹20,000\n*   *Storage:* Western Digital 1TB NVMe SSD ₹5,500\n*  *Case:* NZXT H510 Flow ₹7,500\n*   *PSU:* Corsair CV650 650W ₹6,000\n\n*Total: ₹69,000*\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "600$"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for under or equal to $600 USD, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600G $120\n*   *Motherboard:* MSI B450M PRO-VDH MAX $75\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz $50\n*   *Storage:* Western Digital 1TB NVMe SSD $60\n*   *Case:* Cooler Master MasterBox Q300L $60\n*   *PSU:* Corsair CX550 550W $65\n\n*Total: $430\n\nNote:* This build includes a Ryzen 5 5600G which has integrated graphics, allowing you to use the PC without a dedicated GPU. This helps keep the cost within your budget, leaving room for a dedicated GPU later down the line. The price may vary due to availability and store selection.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "1000$"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for around $1000 USD, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 7600  $230\n*   *Motherboard:* MSI B650-P PRO WIFI  $180\n*   *RAM:* Corsair Vengeance 32GB (2x16GB) DDR5 5200MHz $100\n*   *GPU:* AMD Radeon RX 6700 XT $350\n*   *Storage:* Western Digital 1TB NVMe SSD $60\n*   *Case:* NZXT H510 Flow $90\n*   *PSU:* Corsair RM750x 750W $110\n\n*Total: $1120\n\nNote:* This build slightly exceeds your budget due to the inclusion of a dedicated graphics card, which drastically enhances gaming performance. Prices may vary depending on the vendor and availability. You might need to make small alterations to meet the $1000 price point, like a slightly less expensive case or RAM, if necessary.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "700$"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for around $700 USD, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600 $130\n*   *Motherboard:* MSI B450M PRO-VDH MAX $75\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz $50\n*   *GPU:* AMD Radeon RX 6600 $220\n*   *Storage:* Western Digital 1TB NVMe SSD $60\n*   *Case:* Cooler Master MasterBox Q300L $60\n*   *PSU:* Corsair CX550 550W $65\n\n*Total: $660\n\nNote:* This build includes a dedicated graphics card, which will provide good gaming performance at 1080p resolution. Prices may vary depending on the vendor and availability.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "2000 eu"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for around €2000 EUR, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* Intel Core i7-13700K  €400\n*   *Motherboard:* MSI MAG Z790 Tomahawk WIFI €350\n*   *RAM:* Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz €150\n*   *GPU:* NVIDIA GeForce RTX 4070 €600\n*   *Storage:* Samsung 980 Pro 2TB NVMe SSD €180\n*   *Case:* NZXT H7 Flow €150\n*   *PSU:* Corsair RM850x 850W €170\n\n*Total: €2000\n\nNote:* This build is designed for high-end gaming and productivity tasks. Prices may vary slightly depending on the retailer and current availability.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "1000 eur"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for around €1000 EUR, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 7600  €230\n*   *Motherboard:* MSI B650 Tomahawk WIFI €200\n*   *RAM:* Corsair Vengeance 32GB (2x16GB) DDR5 5200MHz €100\n*   *GPU:* AMD Radeon RX 6700 XT €380\n*   *Storage:* Western Digital 1TB NVMe SSD €70\n*   *Case:* NZXT H510 Flow €90\n*   *PSU:* Corsair RM650x 650W €130\n\n*Total: €1200\n\nNote:* This build slightly exceeds your budget due to the inclusion of a dedicated graphics card, which drastically enhances gaming performance. Prices may vary depending on the vendor and availability. You might need to make small alterations to meet the €1000 price point, like a slightly less expensive case or RAM, if necessary.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "550 eur"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a PC build for around €550 EUR, including only the parts you requested:\n\n*PC Parts List:\n\n   *CPU:* AMD Ryzen 5 5600G  €130\n*   *Motherboard:* MSI B450M PRO-VDH MAX €80\n*   *RAM:* Corsair Vengeance 16GB (2x8GB) DDR4 3200MHz €50\n*   *Storage:* Western Digital 1TB NVMe SSD €60\n*   *Case:* Cooler Master MasterBox Q300L €60\n*   *PSU:* Corsair CX550 550W €70\n\n*Total: €450\n\nNote:* This build uses the integrated graphics of the Ryzen 5 5600G, which allows you to use the PC without a dedicated graphics card. This helps keep the cost within your budget. Prices may vary slightly depending on the retailer and current availability.\n"},
          ],
        },
      ],
    });
    
    const result = await chatSession.sendMessage(amount);
    return result.response.text();
    }
   bhag = run();
  res.render('AI-build', {bhag:bhag});
})
app.get('/Component', (req, res) => {
  res.render('Component');  
})
app.get('/submit-contact', (req, res) => {
    res.render('submit-contact');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Pass`));
