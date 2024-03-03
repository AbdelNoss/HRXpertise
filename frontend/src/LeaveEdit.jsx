import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';


function LeaveEdit() {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        leave_id: '',
        emp_id:'',
        departure:'',
        return_date: '',
        type_leave:''

    });
    const { id } = useParams();

    const supabase = createClient('https://xeqmgyklazsvyovhesxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcW1neWtsYXpzdnlvdmhlc3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTU3MzAsImV4cCI6MjAwMDA3MTczMH0.oxIo0O3i3Fw8mBkGktWC0m2_uSsdIrY651oR_dKiiwc');

    useEffect(() => {
        async function selectLeave() {
            const { data, error } = await supabase
                .from('leave')
                .select('*')
                .eq('leave_id', id)
                .single();

            if (error) {
                console.error('Error selecting leave:', error);
                return null;
            }
            return data;
        }

        selectLeave().then((result) => {
            if (result) {
                setData(result);
            }
        });
    }, []);

    async function EditLeave(emp_Id, leave_id, departure, return_date, type_leave) {
        try {
            const { data, error } = await supabase.from('leave').upsert([
                {
                    leave_id : leave_id,
                    leave_departure: departure ,
                    leave_return: return_date,
                    leave_type: type_leave,
                    emp_id: emp_Id,
                },
            ]);

            if (error) {
                console.error('Error inserting/updating leave:', error);
                return null;
            }

            return 'yes';
        } catch (error) {
            console.error('Error inserting/updating leave:', error);
            return null;
        }
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const emp_Id = event.target.elements.inputtext4.value;
        const leave_id = event.target.elements.inputtext5.value;
        const departure = event.target.elements.inputDeparture.value;
        const return_date = event.target.elements.inputReturn.valueAsDate;
        const type_leave = event.target.elements.inputType.value;

        const result = await EditLeave(emp_Id, leave_id, departure, return_date, type_leave);

        if (result !== null) {
            setError("Le congé a été créé avec succès");
        } else {
            setError("Une erreur est survenue lors de la création de le congé");
        }
    };



    return (
        <div className=' d-flex justify-content-center'>

            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='justify-items-center'> Veuillez remplir les informations du congé</div>
                <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">Identifiant du demandeur</label>
                    <input type='text' className='form-control' id='inputtext4' placeholder="Entrer l'identifiant de l'employé"
                        onChange={e => setData({ ...data, emp_id: e.target.value })} autoComplete="off" value={data.emp_id}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputE4" className="form-label">Identifiant du demandeur</label>
                    <input type='text' className='form-control' id='inputtext5' placeholder="Entrer l'identifiant de l'employé"
                        onChange={e => setData({ ...data, leave_id: e.target.value })} autoComplete="off" value={data.leave_id}/>
                </div>
                <div className='col-12'>
                    <label htmlFor='inputDeparture' className="form-label">Date de départ</label>
                    <input type='date' className='form-control' id='inputDeparture' placeholder="Entrer la date de départ"
                        onChange={e => setData({ ...data, leave_departure: e.target.value })} autoComplete="off" value={data.leave_departure}/>
                </div>
                <div className='col-12'>
                    <label htmlFor='inputReturn' className="form-label">Date de retour</label>
                    <input type='date' className='form-control' id='inputReturn' placeholder="Entrer la date de retour"
                        onChange={e => setData({ ...data, leave_return: e.target.value })} autoComplete="off" value={data.leave_return}/>
                </div>
                <div className='col-12'>
                    <label htmlFor='inputType' className="form-label">Type</label>
                    <input type="text" className='form-control' id='inputType' placeholder="Entrer le type de congé"
                        onChange={e => setData({ ...data, leave_type: e.target.valueAsDate })} autoComplete="off"  value={data.leave_type}  />
                </div>
                {/*<div className='col-12'>
                    <label htmlFor='inoutcountry' className="form-label">
                        <input
                            htmlFor= 'inoutcountry'
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        à l'étranger
                    </label>
    </div>*/}
                <div className='col-12 p-3'>
                    <button type="submit"
                        className="btn  w-100 rounded-0"
                        style={{
                            background: 'linear-gradient(to left, #808080, #000000)',
                            color: '#fff',
                        }}>
                        Modifier le congé
                    </button>
                </div>
                <div className='d-flex justify-content-center'>{error}</div>
            </form>
        </div>
    )
}

export default LeaveEdit