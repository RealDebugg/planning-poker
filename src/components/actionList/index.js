import { RotateCcw, Eye, Delete } from 'lucide-react';

const ActionList = ({ boardAction }) => {
    return (
        <aside id="default-sidebar" className="absolute top-2/4 right-0 z-40 w-50 -translate-y-2/4" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-900 rounded-l-lg shadow-xl">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" onClick={() => boardAction("TOGGLE")} className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-800 group">
                            <Eye/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Show/Hide cards</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => boardAction("UNDO")} className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-800 group">
                            <Delete/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Clear my selection</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => boardAction("CLEAR")} className="flex items-center p-2 rounded-lg text-white hover:bg-zinc-800 group">
                            <RotateCcw/>
                            <span className="flex-1 ms-3 whitespace-nowrap">Clear cards</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default ActionList