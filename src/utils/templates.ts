export const welcomeTemplate = (unsubscribeUrl: string) => {
  const currentYear = new Date().getFullYear();
  return `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; margin: 0 auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
  <div style="height: 5px; background: linear-gradient(to right, #FFD180, #FFF59D, #C5E1A5, #81D4FA, #CE93D8);"></div>
  
  <div style="padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
<img src="cid:logo" alt="Chattri Logo" style="width: 60px; height: 60px; border-radius:8px;">
      <h2 style="color: #444; margin-top: 10px;">Welcome to Chattri!</h2>
    </div>

    <p style="color: #555; font-size: 16px; line-height: 1.5;">
      Hello,<br><br>
      You're officially on the list! We’re building a better way to connect, and we're thrilled to have you with us from the start.
    </p>

    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center; border: 1px solid #eee;">
      <p style="color: #5C6BC0; font-weight: bold; margin: 0; font-size: 14px;">
        You'll be among the first to know when we open our early-access beta.
      </p>
    </div>

    <p style="color: #666; font-size: 14px; line-height: 1.5;">
      In the meantime, stay tuned for updates on the features we're building just for you.
    </p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    
    <p style="color: #bbb; font-size: 11px; text-align: center;">
      You received this because you joined the Chattri waitlist.<br>
      &copy; ${currentYear} Chattri Inc.
      <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</div>
`;
};

export const customeTemplate = (title:string,content: string,unsubscribeUrl: string) =>{
     const currentYear = new Date().getFullYear();
  return `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; margin: 0 auto; padding: 0; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
  <div style="height: 5px; background: linear-gradient(to right, #FFD180, #FFF59D, #C5E1A5, #81D4FA, #CE93D8);"></div>
  
  <div style="padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
<img src="cid:logo" alt="Chattri Logo" style="width: 60px; height: auto;">
      <h2 style="color: #444; margin-top: 10px;">${title}</h2>
    </div>

    <p style="color: #555; font-size: 16px; line-height: 1.5;">
    ${content.replace(/\n/g, '<br>')}    </p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    
    <p style="color: #bbb; font-size: 11px; text-align: center;">
      You received this because you joined the Chattri waitlist.<br>
      &copy; ${currentYear} Chattri Inc.
      <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
    </p>
  </div>
</div>
`;
}
