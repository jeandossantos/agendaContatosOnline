import { Database } from '../src/connection.js';
import { encryptPassword } from '../src/utils/encryptPassword.js';

const contacts = [
  {
    name: 'Caressa Gilbank',
    phone_number: '9 8312-3654',
    phone_number_2: '9 9966-3279',
    email: 'cgilbank1l@bandcamp.com',
    email_2: 'cgilbank1l@wikimedia.org',
    address: '353 Garrison Circle',
  },
  {
    name: 'Katti Hutchin',
    phone_number: '9 8108-7368',
    phone_number_2: '9 9668-2638',
    email: 'khutchin1m@imdb.com',
    email_2: 'khutchin1m@infoseek.co.jp',
    address: '38321 Anhalt Road',
  },
  {
    name: 'Archer Muscat',
    phone_number: '9 8994-1471',
    phone_number_2: '9 9570-6342',
    email: 'amuscat1n@miibeian.gov.cn',
    email_2: 'amuscat1n@archive.org',
    address: '11 Acker Lane',
  },
  {
    name: 'Tamra Oldcroft',
    phone_number: '9 8468-6606',
    phone_number_2: '9 9877-8425',
    email: 'toldcroft1o@vimeo.com',
    email_2: 'toldcroft1o@yellowbook.com',
    address: '94 John Wall Place',
  },
  {
    name: 'Margarita Parkman',
    phone_number: '9 8246-6585',
    phone_number_2: '9 9285-5013',
    email: 'mparkman1p@chron.com',
    email_2: 'mparkman1p@ucsd.edu',
    address: '747 Melrose Lane',
  },
  {
    name: 'Herc Grinyakin',
    phone_number: '9 8408-6514',
    phone_number_2: '9 9259-8676',
    email: 'hgrinyakin1q@unc.edu',
    email_2: 'hgrinyakin1q@shinystat.com',
    address: '94 Kropf Parkway',
  },
  {
    name: 'Beverie Dressel',
    phone_number: '9 8746-8866',
    phone_number_2: '9 9947-9639',
    email: 'bdressel1r@yellowpages.com',
    email_2: 'bdressel1r@lulu.com',
    address: '73887 Vernon Terrace',
  },
  {
    name: 'Jillana Raddon',
    phone_number: '9 8486-6028',
    phone_number_2: '9 9675-1705',
    email: 'jraddon1s@apple.com',
    email_2: 'jraddon1s@redcross.org',
    address: '111 Kingsford Center',
  },
  {
    name: 'Demetre Chitson',
    phone_number: '9 8421-6027',
    phone_number_2: '9 9245-9977',
    email: 'dchitson1t@washington.edu',
    email_2: 'dchitson1t@fastcompany.com',
    address: '3 Nova Road',
  },
  {
    name: 'Rhodie Graeme',
    phone_number: '9 8989-2601',
    phone_number_2: '9 9949-8206',
    email: 'rgraeme1u@msu.edu',
    email_2: 'rgraeme1u@sourceforge.net',
    address: '1 Ohio Circle',
  },
  {
    name: 'Alli Parslow',
    phone_number: '9 8200-3709',
    phone_number_2: '9 9377-6592',
    email: 'aparslow1v@baidu.com',
    email_2: 'aparslow1v@bizjournals.com',
    address: '542 Grayhawk Street',
  },
  {
    name: 'Paule Murfin',
    phone_number: '9 8191-0206',
    phone_number_2: '9 9750-8574',
    email: 'pmurfin1w@netscape.com',
    email_2: 'pmurfin1w@msn.com',
    address: '2843 Blaine Circle',
  },
  {
    name: 'Ebonee Vinecombe',
    phone_number: '9 8399-7952',
    phone_number_2: '9 9361-4622',
    email: 'evinecombe1x@nih.gov',
    email_2: 'evinecombe1x@sitemeter.com',
    address: '373 Evergreen Parkway',
  },
  {
    name: 'Eolande Ripping',
    phone_number: '9 8154-4893',
    phone_number_2: '9 9298-9862',
    email: 'eripping1y@google.cn',
    email_2: 'eripping1y@jigsy.com',
    address: '88829 Milwaukee Point',
  },
  {
    name: 'Mariejeanne Glennard',
    phone_number: '9 8757-2011',
    phone_number_2: '9 9849-8060',
    email: 'mglennard1z@is.gd',
    email_2: 'mglennard1z@engadget.com',
    address: '76736 Delaware Alley',
  },
  {
    name: 'Bobbi Charge',
    phone_number: '9 8501-9910',
    phone_number_2: '9 9871-0483',
    email: 'bcharge20@privacy.gov.au',
    email_2: 'bcharge20@facebook.com',
    address: '17 Fallview Alley',
  },
  {
    name: 'Farlay Phetteplace',
    phone_number: '9 8147-1140',
    phone_number_2: '9 9430-3402',
    email: 'fphetteplace21@smh.com.au',
    email_2: 'fphetteplace21@freewebs.com',
    address: '1290 Summerview Way',
  },
  {
    name: 'Darryl Fairn',
    phone_number: '9 8981-5295',
    phone_number_2: '9 9741-7361',
    email: 'dfairn22@smh.com.au',
    email_2: 'dfairn22@java.com',
    address: '86209 Welch Terrace',
  },
  {
    name: 'Kesley Brewer',
    phone_number: '9 8251-1310',
    phone_number_2: '9 9351-4459',
    email: 'kbrewer23@cnet.com',
    email_2: 'kbrewer23@altervista.org',
    address: '631 Lyons Point',
  },
  {
    name: 'Griswold Gipps',
    phone_number: '9 8611-5318',
    phone_number_2: '9 9980-1893',
    email: 'ggipps24@sitemeter.com',
    email_2: 'ggipps24@earthlink.net',
    address: '47127 Parkside Way',
  },
  {
    name: 'Cary Adkins',
    phone_number: '9 8569-5150',
    phone_number_2: '9 9619-5767',
    email: 'cadkins25@squarespace.com',
    email_2: 'cadkins25@blogs.com',
    address: '87 2nd Parkway',
  },
  {
    name: 'Brinna Siddons',
    phone_number: '9 8549-5612',
    phone_number_2: '9 9229-9999',
    email: 'bsiddons26@scribd.com',
    email_2: 'bsiddons26@goo.ne.jp',
    address: '7 Golf View Point',
  },
  {
    name: 'Nerte Biermatowicz',
    phone_number: '9 8463-0452',
    phone_number_2: '9 9666-5506',
    email: 'nbiermatowicz27@alexa.com',
    email_2: 'nbiermatowicz27@uiuc.edu',
    address: '55207 Almo Crossing',
  },
  {
    name: 'Laurel Crayden',
    phone_number: '9 8712-3745',
    phone_number_2: '9 9465-5929',
    email: 'lcrayden28@bloomberg.com',
    email_2: 'lcrayden28@domainmarket.com',
    address: '34 Waubesa Center',
  },
];

const prisma = new Database().getConnection();

const userMock = await prisma.user.create({
  data: {
    name: 'User Mock',
    email: 'usermock@oi.com',
    password: encryptPassword('123456'),
  },
});

contacts.map((c) => (c.user_id = userMock.id));

await prisma.contact.createMany({
  data: contacts,
});

console.log(
  `User: ${userMock.name} (ID: ${userMock.id}) foi criado com ${contacts.length} contatos.`
);
console.log('E-mai: ' + userMock.email + ' Senha: 123456');
