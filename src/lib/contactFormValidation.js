const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(formData) {
  const values = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    message: formData.message.trim(),
  };
  const errors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.';
  else if (values.email.length > 100) errors.email = 'Email must be 100 characters or fewer.';

  if (!values.message) errors.message = 'Please tell me about your project or message.';
  else if (values.message.length > 1000) errors.message = 'Message must be 1000 characters or fewer.';

  return { values, errors };
}
