import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData))
  });
  return redirect('/products');
}

export default function NewProduct() {
  return (
    <Form method="post">
      <input name="name" required />
      <input name="base_price" type='number' required />
      <textarea name="description" />
      <button type="submit">Save</button>
    </Form>
  );
}