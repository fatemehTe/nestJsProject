import React from 'react'
import * as api from '../API/Api.js';
import './Home.css';

export class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {amount: 0, source:'',id:'', typeA:false, typeR:false, incomes:[], showEdit:false};
      let incomes = []
      api.allIncomes().then((res)=>{
        incomes = res
      }).then(()=>{
        this.setState({incomes:incomes})
      })
      
      this.handleAmountChange = this.handleAmountChange.bind(this);
      this.handleSourceChange = this.handleSourceChange.bind(this);
      this.handleAmountRChange = this.handleAmountRChange.bind(this);
      this.handleSourceRChange = this.handleSourceRChange.bind(this);

      this.handleSourceEdit = this.handleSourceEdit.bind(this);
      this.handleAmountEdit = this.handleAmountEdit.bind(this);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleAmountChange(event) {
        this.setState({amount: event.target.value});
    }
    handleSourceChange(event) {
        this.setState({source: event.target.value});
    }

    handleAmountRChange(event) {
        this.setState({typeA: event.target.value});
        this.setState({typeR: !event.target.value});
    }
    handleSourceRChange(event) {
        this.setState({typeR: event.target.value});
        this.setState({typeA: !event.target.value});
    }

    handleAmountEdit(event) {
        this.setState({amount: event.target.value});
    }
    handleSourceEdit(event) {
        this.setState({source: event.target.value});
    }
      
      
    handleSubmit(event) {
        // let str = this.state.typeA?'income':'expense'
        
        // this.state.typeA?
        api.createIncome({amount:this.state.amount, source:this.state.source})
        // :
        // api.createExpense({amount:this.state.amount, source:this.state.source})
        let incomes = []
        api.allIncomes().then((res)=>{
            incomes = res
          }).then(()=>{
            this.setState({incomes:incomes})
          })
          alert(`An income report was submitted: ` + 'Amount: '+this.state.amount + ' - Source: '+this.state.source);
        event.preventDefault();
    }

    handleDelete(id) {
        api.deleteIncome(id)
    }

    render() {
      return (
        <div className="App">
             {this.state.showEdit && (
                <div style={{position:'absolute', top:'400px', height:'auto', padding:'20px',borderRadius:'10px', marginLeft:'40%', marginRight:'40%', backgroundColor:'gray'}}>
                    <div style={{fontWeight:'bold',fontSize:'24px', marginBottom:'10px'}}>editing the income</div>
                    <div className='form-container'>
                        <div className='form-label' >Amount:</div>
                        <input type="text" value={this.state.amount} onChange={this.handleAmountEdit}/>
                        <div className='form-label' >Source:</div>
                        <input type="text" value={this.state.source} onChange={this.handleSourceEdit}/>
                    </div>
                <button style={{marginTop:'20px'}} onClick={()=>{
                    this.setState({showEdit:false})
                    api.putIncome({amount:this.state.amount, source:this.state.source},this.state.id).then(()=>{
                        alert(` ${this.state.source} report was edited `);
                    })
                    const reportIndex = this.state.incomes.findIndex((report)=>report.id === this.state.id)
                    this.state.incomes[reportIndex] = {
                    ...this.state.incomes[reportIndex],
                    ...{amount:this.state.amount, source:this.state.source},
                    updated_at: new Date()
                    }
                    this.setState({incomes:this.state.incomes})
                }}>done</button>
            </div>
            )}
            <header className="App-header">
                <div style={{border:'1px solid white', padding:'5px', marginRight:'10px'}}>
                <div style={{fontWeight:'bold',fontSize:'24px', marginBottom:'10px'}}>income list</div>
                <div style={{fontSize:'24px', marginBottom:'10px'}}>Amount / Source / operation</div>
                    {
                        this.state.incomes.map((income)=>{
                            return(
                                <div 
                                    className='list-container' 
                                    style={{borderRadius:'5px', backgroundColor:'white', color:'black', margin:'3px', padding:'4px', textAlign:'center' }}
                                >
                                    <span style={{marginRight:'5px'}}>{income.amount}</span>
                                    <span style={{marginRight:'5px'}}>{income.source}</span>
                                    <button onClick={(()=>{
                                        this.setState({showEdit:true})
                                        this.setState({amount:income.amount})
                                        this.setState({source:income.source})
                                        this.setState({id:income.id})
                                    })}>edit</button>
                                    <button onClick={(()=>{
                                        api.deleteIncome(income.id).then(()=>{
                                            alert(` ${income.source} report was deleted `);
                                        })
                                        this.state.incomes.splice(0,1)
                                        this.setState({incomes:this.state.incomes})
                                    }
                                    )}>delete</button>
                                </div>
                                )
                        })
                    }
                </div>
                <form onSubmit={this.handleSubmit} style={{border:'1px solid white', padding:'5px'}}>
                <div className='form-container'>
                    <div className='form-label' >Amount:</div>
                    <div>
                        <input type="text" value={this.state.amount} onChange={this.handleAmountChange}/>
                    </div>
                    <div className='form-label'>Source:</div>
                    <div>
                        <input type="text" value={this.state.source} onChange={this.handleSourceChange}/>
                    </div>
                </div>
                {/* <div style={{display:'flex', flexDirection:'row'}}>
                    <input type='radio' name='type' value={this.state.typeA} onChange={this.handleAmountRChange}/>
                    <span className='form-label'>income</span>
                </div>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <input type='radio' name='type' value={this.state.typeR} onChange={this.handleSourceRChange}/>
                    <span className='form-label'>expense</span>
                </div> */}
                <input type="submit" value="create income" />
                </form>
                
            </header>
        </div>
      );
    }
  }
