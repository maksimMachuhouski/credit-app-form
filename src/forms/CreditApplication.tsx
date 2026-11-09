import { useState } from 'react';
import './CreditApplication.css';
interface Field { id: string; label: string; type: string; required: boolean; row: number; col: number; width: number; options?: string[]; }
interface Heading { type: 'heading'; label: string; row: number; col: number; width: number; }
type FormElement = Field | Heading;
export default function CreditApplication() {
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const pages: { title: string; elements: FormElement[] }[] = [{ title: 'Applicant', elements: [{ type: 'heading', label: 'Applicant Information', row: 1, col: 1, width: 12 }, { id: 'first_name', label: 'First name', type: 'text', required: true, row: 2, col: 1, width: 6 }, { id: 'last_name', label: 'Last name', type: 'text', required: true, row: 2, col: 7, width: 6 }, { id: 'email', label: 'Email', type: 'email', required: true, row: 3, col: 1, width: 12 }, { id: 'phone', label: 'Phone', type: 'tel', required: true, row: 4, col: 1, width: 12 }, { id: 'dob', label: 'Date of birth', type: 'date', required: true, row: 5, col: 1, width: 12 }, { id: 'street', label: 'Street address', type: 'text', required: true, row: 6, col: 1, width: 12 }, { id: 'city', label: 'City', type: 'text', required: true, row: 7, col: 1, width: 5 }, { id: 'state', label: 'State', type: 'text', required: true, row: 7, col: 6, width: 3 }, { id: 'zip', label: 'Zip', type: 'text', required: true, row: 7, col: 9, width: 4 }] }, { title: 'Loan', elements: [{ type: 'heading', label: 'Loan Details', row: 1, col: 1, width: 12 }, { id: 'amount', label: 'Loan amount', type: 'currency', required: true, row: 2, col: 1, width: 12 }, { id: 'purpose', label: 'Loan purpose', type: 'select', required: true, options: ['Home improvement', 'Debt consolidation', 'Other'], row: 3, col: 1, width: 12 }, { id: 'income', label: 'Annual income', type: 'currency', required: true, row: 4, col: 1, width: 12 }, { id: 'credit', label: 'I agree to a credit check', type: 'checkbox', required: true, row: 5, col: 1, width: 12 }] }];
  const validate = () => {
    const newErrors: Record<string, string> = {};
    pages[step].elements.forEach(el => {
      if ('id' in el && el.required) {
        if (el.type === 'checkbox') { if (data[el.id] !== 'true') newErrors[el.id] = 'Required'; }
        else if (!data[el.id]) newErrors[el.id] = 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  if (submitted) return (<div className="credit-application-container"><h2>Submitted</h2>{pages.flatMap(p => p.elements).filter((e): e is Field => 'id' in e).map((e) => (<p key={e.id}><strong>{e.label}:</strong> {data[e.id] || 'N/A'}</p>))}<button onClick={() => { setData({}); setStep(0); setSubmitted(false); }}>Start Over</button></div>);
  const page = pages[step];
  return (<div className="credit-application-container"><h2>{page.title}</h2><p>Step {step + 1} of {pages.length}</p><div className="credit-application-grid">{page.elements.map((el, i) => (<div key={i} className="credit-application-cell" style={{ gridColumn: `${el.col} / span ${el.width}`, gridRow: el.row }}>{el.type === 'heading' ? <h2>{el.label}</h2> : (<><label htmlFor={(el as Field).id}>{(el as Field).label}</label>{(el as Field).type === 'select' ? <select id={(el as Field).id} value={data[(el as Field).id] || ''} onChange={e => setData({...data, [(el as Field).id]: e.target.value})}><option value="" /><option value="Home improvement">Home improvement</option><option value="Debt consolidation">Debt consolidation</option><option value="Other">Other</option></select> : (el as Field).type === 'currency' ? <div className="credit-application-currency"><span>$</span><input type="number" step="0.01" id={(el as Field).id} value={data[(el as Field).id] || ''} onChange={e => setData({...data, [(el as Field).id]: e.target.value})} /></div> : (el as Field).type === 'checkbox' ? <input type="checkbox" id={(el as Field).id} checked={data[(el as Field).id] === 'true'} onChange={e => setData({...data, [(el as Field).id]: String(e.target.checked)})} /> : <input type={(el as Field).type} id={(el as Field).id} value={data[(el as Field).id] || ''} onChange={e => setData({...data, [(el as Field).id]: e.target.value})} />}{errors[(el as Field).id] && <span className="credit-application-error">{errors[(el as Field).id]}</span>}</>)}</div>))}</div><div className="credit-application-nav">{step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}<button onClick={() => { if (validate()) step < pages.length - 1 ? setStep(step + 1) : setSubmitted(true); }}>{step === pages.length - 1 ? 'Submit' : 'Next'}</button></div></div>);
}
