
  const { v4: uuidv4 } = require('uuid');
  const nodemailer = require('nodemailer');
  
  function createICS(plan) {
    const eventUid = uuidv4();
    const start = new Date(plan.startDate);
    const end = new Date(plan.endDate);
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//OutdoorNow//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${eventUid}
DTSTART:${start.toISOString()}
DTEND:${end.toISOString()}
SUMMARY:${plan.activity}
LOCATION:${plan.streetAddress}
DESCRIPTION:Plan created by ${plan.username}
END:VEVENT
END:VCALENDAR
`;
    return icsContent;
  }
  
  async function sendInvite(inviteeEmail, icsContent) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'outdoornow11@gmail.com',
        pass: 'sfkubxcqpvrrrnkd'
      }
    });
  
    const message = {
      from: 'outdoornow11@gmail.com',
      to: inviteeEmail,
      subject: 'Invitation to activity',
      text: `Please join me for this activity at the following location. \n Open the attached file for location and other details`,
      attachments: [
        {
          filename: 'invite.ics',
          content: icsContent,
          contentType: 'text/calendar'
        }
      ]
    };
  
    const info = await transporter.sendMail(message);
    return info
  }

  module.exports = {createICS, sendInvite};