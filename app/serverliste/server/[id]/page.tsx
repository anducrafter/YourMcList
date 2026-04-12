import { ChartAreaInteractive } from '@/app/compoments/dynamic/chartonlineinteractiv';
import CopyIpButton from '@/app/compoments/dynamic/copyInButton';
import { prisma } from '@/lib/actions/prisma';
import React from 'react'



const  server =  async ({ params }: { params: Promise<{ id: string }>; }) => {


  const { id  }= await params

  const api = await  prisma.mcServer.findUnique({
    where: {
        serverid : id,
    },
  }
  )


  
  const history = await prisma.mcServerHistory.findMany({
    where: {
      serverid: id,
    }
  })
  return (
<div className="m-10">
  <div className="max-w-5xl mx-auto rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm">

    {/* Header */}
    <div className="flex items-center justify-between border-b border-neutral-200 pb-6 mb-8">
      <div>
        <h2 className="text-3xl font-semibold text-black">
          {api?.servername}
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          {api?.ip}
        </p>
      </div>

      {api?.icon && (
        <img
          src={api.icon}
          className="w-16 h-16 rounded-xl border border-neutral-200"
        />
      )}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* LEFT — WICHTIG */}
      <div className="md:col-span-2 space-y-7">

        <section>
          <h3 className="text-sm font-medium text-neutral-500">description</h3>
          <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-black">
            {api?.description}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-6">

          <div>
            <h3 className="text-sm font-medium text-neutral-500">Server IP</h3>
            <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm font-mono">
              {api?.ip}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-neutral-500">Version</h3>
            <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm">
              {api?.versionMajor +"."+api?.versionMinor}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-neutral-500">country</h3>
            <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm">
              {api?.servercountry}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-neutral-500">Typ</h3>
            <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm">
              {api?.bedrock ? "Bedrock" : "Java"}
            </div>
          </div>

        </section>

      </div>

      {/* RIGHT — NEBENSÄCHLICH */}
      <div className="space-y-6">

        <section className="rounded-xl border border-neutral-200 p-5 space-y-3">
          <h3 className="font-medium">Status</h3>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Approved</span>
            <span>{api?.approved ? "Ja" : "Nein"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Cheked</span>
            <span>{api?.cheked || "—"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Created</span>
            <span>
              {api?.createdAt
                ? new Date(api.createdAt).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-200 p-5 space-y-3">
          <h3 className="font-medium">Links</h3>

          {api?.website && <a className="block text-sm underline" href={api.website}>Website</a>}
          {api?.discord && <a className="block text-sm underline" href={api.discord}>Discord</a>}
          {api?.instagram && <a className="block text-sm underline" href={api.instagram}>Instagram</a>}
          {api?.youtube && <a className="block text-sm underline" href={api.youtube}>YouTube</a>}
          {api?.ticktock && <a className="block text-sm underline" href={api.ticktock}>TikTok</a>}
        </section>

        <CopyIpButton ip={api?.ip} />


      </div>

    </div>
    <ChartAreaInteractive></ChartAreaInteractive>
  </div>
</div>
  )
}

export default server