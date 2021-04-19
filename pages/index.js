import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useState} from 'react'
import Header from '../components/Header'
import Main from '../components/Main'

export default function Home({Repo}) {

  return (
    <div>
      <Header/>
      <Main RepoList={Repo}/>
    </div>
  )
}

export async function getStaticProps() {

  var today = new Date();
  today.setDate(today.getDate() - 7);
  var WeekAgo = today.toISOString().substr(0, 10);

  const res = await fetch("https://api.github.com/search/repositories?q=language:javascript created:>="+ WeekAgo +" sort:stars");
  const data = await res.json();

  return {
    props: {Repo:data}
  }
}
