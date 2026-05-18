import { auth } from "@/auth";
import { prisma } from "@/lib/actions/prisma";
import { updateServer } from "@/app/api/actions/server-actions";
import { notFound, redirect } from "next/navigation";

// Reuse your existing components
import Dropdown from '@/app/compoments/dynamic/Inputcountrys'
import MultiColumnDropdown from '@/app/compoments/dynamic/inputtags'
import InputVersoin from '@/app/compoments/dynamic/inputversion'

export default async function EditServerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
if (!session?.user?.id) {
    redirect("/api/auth/signin"); // Or your custom login route
  }
  const server = await prisma.mcServer.findUnique({
    where: { serverid: id, userId: session.user.id },
  });

  if (!server) notFound();
  const updateServerWithId = updateServer.bind(null, server.serverid);

  let major = server.versionMajor || 1 
  let minor =server.versionMinor || 1

 const versionserver = `${major}.${minor}`;
  console.log(versionserver, major, minor)
  return (
    <div className='max-w-7xl mx-auto my-12 px-4'>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-black tracking-tight uppercase">Edit Settings</h1>
        <p className="text-neutral-500 mt-2">Update your listing for <span className="text-black font-bold">{server.servername}</span></p>
      </div>

      <form action={updateServerWithId}>
        <div className='grid grid-cols-12 gap-12'>
          
          {/* Left Column: Core & Presentation */}
          <div className='col-span-12 lg:col-span-7 space-y-10'>
            
            <section className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className='text-2xl font-bold text-black'>Core Information</h2>
              </div>

              <div> 
                <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Server Name</h3>
                <input 
                  name='servername' 
                  defaultValue={server.servername}
                  required 
                  className='mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:outline-none transition-all' 
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex-1'>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">Server IP</h3>
                  <input 
                    required  
                    name='ip' 
                    defaultValue={server.ip}
                    className='mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:outline-none transition-all font-mono' 
                  />
                </div>

                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id="bedrock"
                    name='bedrock'
                    defaultChecked={server.bedrock}
                    className="h-5 w-5 rounded-md border-gray-300 text-black accent-black"
                  />
                  <label htmlFor="bedrock" className="ml-3 text-sm font-medium text-neutral-700">Bedrock Edition</label>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div> 
                  <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Primary Version</h3>
                  <div className="mt-2">
                    <InputVersoin defaultValue={versionserver.toString()}   />
                  </div>
                </div>
                <div> 
                  <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Location</h3>
                  <div className="mt-2">
                    <Dropdown defaultValue={server.servercountry}  />
                  </div>
                </div>
              </div>
            </section>



              <section className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className='text-2xl font-bold text-black'>Voting</h2>
                <h1>To add vote rewards for your user add your votify infomration</h1>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">VoteIp</h3>
                <input type="text" id="voteip" name="voteip" className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:outline-none transition-all font-mono" placeholder="" />
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">VotePort</h3>
  <input type="text" id="voteport" name="voteport" className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:outline-none transition-all font-mono" placeholder="" />
              </div>
                            <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">VoteKEY</h3>
                <h4>For the Votekey it can be an RSA or an Token</h4>
  <input type="text" id="votekey" name="votekey" className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm focus:bg-white focus:border-black focus:outline-none transition-all font-mono" placeholder="" />
              </div>
            </section>

            <section className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className='text-2xl font-bold text-black'>Presentation</h2>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-600">Description</h3>
                <textarea
                  name="description"
                  defaultValue={server.description}
                  rows={8}
                  required 
                  className="mt-2 block w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:bg-white focus:border-black focus:outline-none transition-all"
                />
              </div>

              <div> 
                <h3 className='font-semibold text-sm uppercase tracking-wider text-neutral-600'>Tags & Categories</h3>
                <MultiColumnDropdown initialValue={server.config} />
              </div>
            </section>

            <button type="submit" className='w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-all shadow-xl text-lg uppercase tracking-widest'>
              Save Changes
            </button>
          </div>

          {/* Right Column: Socials */}
          <div className='col-span-12 lg:col-span-5'>
            <div className="lg:sticky lg:top-28 space-y-6">
              <section className="bg-neutral-900 text-white p-8 rounded-2xl shadow-xl">
                <h2 className='text-xl font-bold mb-1'>Social Presence</h2>
                <div className="space-y-4 mt-6">
                  {[
                    { label: 'Website', name: 'website', value: server.website },
                    { label: 'Discord', name: 'discord', value: server.discord },
                    { label: 'Instagram', name: 'instagram', value: server.instagram },
                    { label: 'TikTok', name: 'ticktock', value: server.ticktock },
                    { label: 'YouTube', name: 'youtube', value: server.youtube }
                  ].map((social) => (
                    <div key={social.name}>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{social.label}</label>
                      <input 
                        type="text" 
                        name={social.name} 
                        defaultValue={social.value || ""}
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-sm text-white focus:border-white focus:outline-none' 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}