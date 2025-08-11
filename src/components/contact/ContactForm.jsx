import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ContactForm() {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-resort-slate mb-2">Fullname</label>
            <Input placeholder="e.g John Becker" className="bg-white" />
          </div>
          <div>
            <label className="block text-sm text-resort-slate mb-2">Email</label>
            <Input type="email" placeholder="johnbecker@gmail.com" className="bg-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-resort-slate mb-2">Message</label>
            <textarea
              rows={8}
              placeholder="message"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-resort-olive bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </section>
  );
}


