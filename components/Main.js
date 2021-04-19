import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState} from 'react'

export default function Main(props) {

    const [RepoList,SetRepoList] = useState(props.RepoList.items);
    const [language,Setlanguage] = useState("javascript");
  
    const GitData = ()=>{
      var today = new Date();
      today.setDate(today.getDate() - 7);
      var WeekAgo = today.toISOString().substr(0, 10);
      fetch("https://api.github.com/search/repositories?q=language:"+language+" created:>="+ WeekAgo +" sort:stars")
      .then(res=>res.json())
      .then((data)=>{
          SetRepoList(data.items);
      })
    }

    return (
        <div>
            <label htmlFor="language" className={styles.Option}>Search by given languages</label>

            <div className={styles.selectionDiv}>
            <select className={styles.language} name="language" onChange={(e)=>Setlanguage(e.target.value)}>
                <option value="javascript">javascript</option>
                <option value="python">python</option>
                <option value="java">java</option>
                <option value="C++">C++</option>
                <option value="PHP">Php</option>
            </select>

            <button type="submit" className={styles.SubmitBut} onClick={()=>GitData()}>Search</button>
            </div>

            <div className={styles.box}>

            {RepoList.map(SingleRepo=>{

                const RepoName = SingleRepo.full_name.split("/");

                        return(
                        <div className={styles.card} key={SingleRepo.id}> 
                            <img src={SingleRepo.owner.avatar_url} alt="Avatar" style={{width:"100%"}}></img>
                            <div className={styles.container}>
                                <div className="RepoName">
                                    <h4><b>{RepoName[1]}</b></h4>
                                </div>
                                <div className="ownerName">
                                    <h5><b>Owner :{SingleRepo.owner.login}</b></h5>
                                </div>
                                <div className="description">
                                    <p>{SingleRepo.description?SingleRepo.description.substring(0,50)+"...":"no description"}</p>
                                </div>
                            </div>
                            <div className={styles.link}>
                            <Link href={SingleRepo.html_url}><a  className={styles.LinkToRepo}>Link to repo</a></Link>
                            </div>
                        </div>
                        )
            })}
            </div>
        </div>
    )
}
