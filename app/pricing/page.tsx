import { redirect } from 'next/navigation';

// The nav scrolls to the #pricing anchor on the landing page. Direct visits to
// /pricing redirect there.
export default function PricingPage() {
  redirect('/#pricing');
}
