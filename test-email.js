const testData = {
  name: "Test User",
  email: "test@example.com",
  message: "This is a test message from automated test",
  service: "backend"
};

async function testEmailFunction() {
  try {
    console.log('🧪 Testing email function...');
    console.log('📤 Sending test data:', testData);
    
    const response = await fetch('http://localhost:8888/.netlify/functions/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('\n📊 Response Status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('\n📦 Response Data:');
    console.log(JSON.stringify(data, null, 2));
    
    if (response.ok && data.success) {
      console.log('\n✅ SUCCESS! Email sent successfully!');
    } else {
      console.log('\n❌ ERROR! Failed to send email');
      console.log('Error details:', data.error || data.details);
    }
  } catch (error) {
    console.error('\n❌ EXCEPTION:', error.message);
    console.log('\n💡 Make sure Netlify dev is running:');
    console.log('   npm run dev:netlify');
  }
}

testEmailFunction();

