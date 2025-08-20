import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Modal from '../ui/Modal';
import { X, LogIn, UserPlus } from 'lucide-react';

export default function LoginRequiredModal({ isOpen, onClose, onNavigateToLogin, onNavigateToRegister }) {
    return (
        <Modal open={isOpen} onClose={onClose} size="sm">
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold text-center w-full">
                        Inicia Sesión para Continuar
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <LogIn className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Necesitas estar logueado
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Para confirmar tu reserva, necesitas iniciar sesión en tu cuenta.
                            Si no tienes una cuenta, puedes registrarte gratuitamente.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={onNavigateToLogin}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar Sesión
                        </Button>

                        <Button
                            onClick={onNavigateToRegister}
                            variant="outline"
                            className="w-full"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Crear Cuenta
                        </Button>
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 underline"
                        >
                            Continuar sin iniciar sesión
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Modal>
    );
}


