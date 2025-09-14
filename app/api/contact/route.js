import { z } from 'zod';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(''),
  productType: z.enum(['roasted','green','ground','bulk']).default('roasted'),
  volume: z.string().optional().default(''),
  message: z.string().optional().default(''),
  companyWebsite: z.string().optional().default('') // honeypot
});

export async function POST(req) {
  try {
    const json = await req.json();
    const data = schema.safeParse(json);
    if (!data.success) {
      return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
    }
    const payload = data.data;

    // Honeypot
    if (payload.companyWebsite) {
      return new Response(JSON.stringify({ message: 'Thanks!' }), { status: 202 });
    }

    const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !to) {
      console.log('CONTACT REQUEST (no SMTP configured)', payload);
      return new Response(JSON.stringify({ message: 'Received. We will respond shortly (email not configured on server).' }), { status: 202 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const html = `
      <h2>New Quote Request — Brian's Arabica</h2>
      <p><b>Name:</b> ${payload.name}</p>
      <p><b>Email:</b> ${payload.email}</p>
      <p><b>Company:</b> ${payload.company}</p>
      <p><b>Product Type:</b> ${payload.productType}</p>
      <p><b>Volume:</b> ${payload.volume}</p>
      <p><b>Message:</b> ${payload.message}</p>
    `;

    await transporter.sendMail({
      to,
      from: `Brian's Arabica <${process.env.SMTP_USER}>`,
      subject: `Quote Request: ${payload.productType} — ${payload.name}`,
      html
    });

    return new Response(JSON.stringify({ message: 'Request sent. We will reply by email.' }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
