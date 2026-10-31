import { useState } from 'react';
import './CreditApplication.css';

export default function CreditApplication() {
  const [data, setData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const pages = [
    {
      title: 'Applicant',
      elements: [
        { type: 'heading', id: 'h1', label: 'Applicant Information', row: 1, col: 1, width: 12 },
        { type: 'text', id: 'firstName', label: 'First name', placeholder: 'Jane', required: true, row: 2, col: 1, width: 6 },
        { type: 'text', id: 'lastName', label: 'Last name', placeholder: 'Doe', required: true, row: 2, col: 7, width: 6 },
        { type: 'email', id: 'email', label: 'Email', placeholder: 'jane@example.com', required: true, row: 3, col: 1, width: 12 },
        { type: 'tel', id: 'phone', label: 'Phone', placeholder: '(555) 000-0000', required: true, row: 4, col: 1, width: 12 },
        { type: 'date', id: 'dob', label: 'Date of birth', placeholder: 'MM/DD/YYYY', required: true, row: 5, col: 1, width: 12 }
      ]
    },
    {
      title: 'Loan',
      elements: [
        { type: 'heading', id: 'h2', label: 'Loan Details', row: 1, col: 1, width: 12 },
        { type: 'currency', id: 'amount', label: 'Loan amount', placeholder: '5000', required: true, row: 2, col: 1, width: 12 },
        { type: 'select', id: 'purpose', label: 'Loan purpose', required: true, options: ['Home improvement', 'Debt consolidation', 'Other'], row: 3, col: 1, width: 12 },
        { type: 'currency', id: 'income', label: 'Annual income', placeholder: '50000', required: true, row: 4, col: 1, width: 12 },
        { type: 'checkbox', id: 'agree', label: 'I agree to a credit check', required: true, row: 5, col: 1, width: 12 }
      ]
    }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    pages[step].elements.forEach((el) => {
      if (el.required) {
        if (el.type === 'checkbox' && !data[el.id]) newErrors[el.id] = 'Required';
        else if (!data[el.id]) newErrors[el.id] = 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (submitted) return (
    <div className="credit-application-container">
      <h2>Submitted</h2>
      {Object.entries(data).map(([k, v]) => <p key={k}><strong>{k}:</strong> {String(v)}</p>)}
      <button onClick={() => { setData({}); setStep(0); setSubmitted(false); }}>Start Over</button>
    </div>
  );

  const page = pages[step];
  return (
    <div className="credit-application-container">
      <h2>{page.title}</h2>
      <p>Step {step + 1} of {pages.length}</p>
      <div className="credit-application-grid">
        {page.elements.map((el) => (
          <div key={el.id} style={{ gridColumn: `${el.col} / span ${el.width}`, gridRow: el.row }} className="credit-application-field">
            {el.type === 'heading' ? <h2>{el.label}</h2> : (
              <>
                <label htmlFor={el.id}>{el.label}</label>
                {el.type === 'select' ? (
                  <select id={el.id} value={data[el.id] || ''} onChange={(e) => setData({...data, [el.id]: e.target.value})}>
                    <option value="" />
                    {el.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : el.type === 'checkbox' ? (
                  <input type="checkbox" id={el.id} checked={!!data[el.id]} onChange={(e) => setData({...data, [el.id]: e.target.checked})} />
                ) : (
                  <div className="credit-application-input-row">
                    {el.type === 'currency' && <span>$</span>}
                    <input type={el.type === 'currency' ? 'number' : el.type} step="0.01" id={el.id} placeholder={el.placeholder} value={data[el.id] || ''} onChange={(e) => setData({...data, [el.id]: e.target.value})} />
                  </div>
                )}
                {errors[el.id] && <span className="credit-application-error">{errors[el.id]}</span>}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="credit-application-nav">
        {step > 0 && <button onClick={() => setStep(step - 1)}>Back</button>}
        <button onClick={() => { if (validate()) step < pages.length - 1 ? setStep(step + 1) : setSubmitted(true); }}>{step === pages.length - 1 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}
