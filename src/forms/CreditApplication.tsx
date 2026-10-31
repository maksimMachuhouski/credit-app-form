import { useState } from 'react';
import './CreditApplication.css';
export default function CreditApplication() {
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const pages = [{
    title: 'Applicant',
    elements: [
      { id: 'heading1', type: 'heading', label: 'Applicant Information', row: 1, col: 1, width: 12 },
      { id: 'first_name', type: 'text', label: 'First name', placeholder: 'Jane', required: true, row: 2, col: 1, width: 6 },
      { id: 'last_name', type: 'text', label: 'Last name', placeholder: 'Doe', required: true, row: 2, col: 7, width: 6 },
      { id: 'email', type: 'email', label: 'Email', placeholder: 'jane@example.com', required: true, row: 3, col: 1, width: 12 },
      { id: 'phone', type: 'tel', label: 'Phone', placeholder: '(555) 000-0000', required: true, row: 4, col: 1, width: 12 },
      { id: 'dob', type: 'date', label: 'Date of birth', placeholder: 'MM/DD/YYYY', required: true, row: 5, col: 1, width: 12 },
      { id: 'street', type: 'text', label: 'Street address', placeholder: '123 Main St', required: true, row: 6, col: 1, width: 12 },
      { id: 'city', type: 'text', label: 'City', placeholder: 'City', required: true, row: 7, col: 1, width: 5 },
      { id: 'state', type: 'text', label: 'State', placeholder: 'State', required: true, row: 7, col: 6, width: 3 },
      { id: 'zip', type: 'text', label: 'Zip', placeholder: 'Zip', required: true, row: 7, col: 9, width: 4 }
    ]
  }, {
    title: 'Loan',
    elements: [
      { id: 'heading2', type: 'heading', label: 'Loan Details', row: 1, col: 1, width: 12 },
      { id: 'loan_amount', type: 'currency', label: 'Loan amount', placeholder: '5000', required: true, row: 2, col: 1, width: 12 },
      { id: 'loan_purpose', type: 'select', label: 'Loan purpose', options: ['Home improvement', 'Debt consolidation', 'Other'], required: true, row: 3, col: 1, width: 12 },
      { id: 'annual_income', type: 'currency', label: 'Annual income', placeholder: '50000', required: true, row: 4, col: 1, width: 12 },
      { id: 'credit_check', type: 'checkbox', label: 'I agree to a credit check', required: true, row: 5, col: 1, width: 12 }
    ]
  }];
  const validate = () => {
    const newErrors: Record<string, string> = {};
    pages[step].elements.forEach(el => {
      if (el.required && !data[el.id]) newErrors[el.id] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  if (submitted) return (
    <div className="credit-application-wrapper">
      <h2>Submitted</h2>
      {pages.flatMap(p => p.elements).filter(e => e.type !== 'heading' && e.type !== 'button').map(el => (
        <p key={el.id}><strong>{el.label}:</strong> {data[el.id] || 'N/A'}</p>
      ))}
      <button onClick={() => { setData({}); setStep(0); setSubmitted(false); }}>Start Over</button>
    </div>
  );
  const page = pages[step];
  return (
    <div className="credit-application-wrapper">
      <h2>{page.title}</h2>
      <p>Step {step + 1} of {pages.length}</p>
      <div className="credit-application-grid">
        {page.elements.map(el => (
          <div key={el.id} className="credit-application-el" style={{ gridColumn: `${el.col} / span ${el.width}`, gridRow: el.row }}>
            {el.type === 'heading' ? <h3>{el.label}</h3> : (
              <>
                <label htmlFor={el.id}>{el.label}</label>
                {el.type === 'select' ? (
                  <select id={el.id} value={data[el.id] || ''} onChange={e => setData({...data, [el.id]: e.target.value})}>
                    <option value="" />
                    {el.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : el.type === 'checkbox' ? (
                  <input type="checkbox" id={el.id} checked={!!data[el.id]} onChange={e => setData({...data, [el.id]: e.target.checked ? 'Yes' : ''})} />
                ) : el.type === 'currency' ? (
                  <div className="credit-application-currency"><span className="credit-application-symbol">$</span><input type="number" step="0.01" id={el.id} placeholder={el.placeholder} value={data[el.id] || ''} onChange={e => setData({...data, [el.id]: e.target.value})} /></div>
                ) : (
                  <input type={el.type} id={el.id} placeholder={el.placeholder} value={data[el.id] || ''} onChange={e => setData({...data, [el.id]: e.target.value})} />
                )}
                {errors[el.id] && <p className="credit-application-error">{errors[el.id]}</p>}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="credit-application-nav">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}
        <button onClick={() => { if (validate()) { if (step < pages.length - 1) setStep(step + 1); else setSubmitted(true); } }}>{step === pages.length - 1 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}
