import React, { useState, useEffect, useRef } from 'react';
import { ApexOptions } from 'apexcharts';

// Dati di esempio per gli ordini
const orderData = {
  lastWeek: [31, 40, 28, 51, 42, 109, 100],
  lastMonth: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20)
};

// Dati di esempio per i guadagni
const revenueData = {
  lastWeek: [420, 380, 300, 520, 450, 980, 890],
  lastMonth: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 200)
};

declare global {
  interface Window {
    ApexCharts: any;
  }
}

const Statistics: React.FC = () => {
  const [ordersPeriod, setOrdersPeriod] = useState<'week' | 'month'>('week');
  const [revenuePeriod, setRevenuePeriod] = useState<'week' | 'month'>('week');
  const ordersChartRef = useRef<any>(null);
  const revenueChartRef = useRef<any>(null);
  const ordersChartElRef = useRef<HTMLDivElement>(null);
  const revenueChartElRef = useRef<HTMLDivElement>(null);

  const ordersChartOptions: ApexOptions = {
    chart: {
      height: 250,
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      foreColor: '#4B5563',
      toolbar: {
        show: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#f97316'],
    xaxis: {
      categories: ordersPeriod === 'week' 
        ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
        : Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString()
      }
    },
    grid: {
      show: true,
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -28
      }
    }
  };

  const revenueChartOptions: ApexOptions = {
    ...ordersChartOptions,
    colors: ['#22c55e'],
    yaxis: {
      labels: {
        formatter: (value) => `€${Math.round(value)}`
      }
    }
  };

  useEffect(() => {
    // Inizializza i grafici
    const initializeCharts = () => {
      if (typeof window.ApexCharts !== 'undefined' && 
          ordersChartElRef.current && 
          revenueChartElRef.current) {
        
        // Cleanup dei grafici esistenti
        if (ordersChartRef.current) {
          ordersChartRef.current.destroy();
        }
        if (revenueChartRef.current) {
          revenueChartRef.current.destroy();
        }

        // Inizializza il grafico degli ordini
        ordersChartRef.current = new window.ApexCharts(
          ordersChartElRef.current,
          {
            ...ordersChartOptions,
            series: [{
              name: 'Ordini',
              data: orderData.lastWeek
            }]
          }
        );
        ordersChartRef.current.render();

        // Inizializza il grafico dei guadagni
        revenueChartRef.current = new window.ApexCharts(
          revenueChartElRef.current,
          {
            ...revenueChartOptions,
            series: [{
              name: 'Guadagni',
              data: revenueData.lastWeek
            }]
          }
        );
        revenueChartRef.current.render();
      }
    };

    // Aspetta che il DOM sia pronto
    setTimeout(initializeCharts, 0);

    return () => {
      // Cleanup dei grafici
      if (ordersChartRef.current) {
        ordersChartRef.current.destroy();
      }
      if (revenueChartRef.current) {
        revenueChartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Aggiorna i dati quando cambia il periodo
    if (ordersChartRef.current) {
      try {
        ordersChartRef.current.updateOptions({
          xaxis: {
            ...ordersChartOptions.xaxis,
            categories: ordersPeriod === 'week' 
              ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
              : Array.from({ length: 30 }, (_, i) => (i + 1).toString())
          }
        });
        ordersChartRef.current.updateSeries([{
          name: 'Ordini',
          data: ordersPeriod === 'week' ? orderData.lastWeek : orderData.lastMonth
        }]);
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del grafico ordini:', error);
      }
    }
  }, [ordersPeriod]);

  useEffect(() => {
    // Aggiorna i dati quando cambia il periodo
    if (revenueChartRef.current) {
      try {
        revenueChartRef.current.updateOptions({
          xaxis: {
            ...revenueChartOptions.xaxis,
            categories: revenuePeriod === 'week' 
              ? ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
              : Array.from({ length: 30 }, (_, i) => (i + 1).toString())
          }
        });
        revenueChartRef.current.updateSeries([{
          name: 'Guadagni',
          data: revenuePeriod === 'week' ? revenueData.lastWeek : revenueData.lastMonth
        }]);
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del grafico guadagni:', error);
      }
    }
  }, [revenuePeriod]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Statistiche</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico Ordini */}
        <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex justify-between">
            <div>
              <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
                {ordersPeriod === 'week' 
                  ? orderData.lastWeek.reduce((a, b) => a + b, 0)
                  : orderData.lastMonth.reduce((a, b) => a + b, 0)}
              </h5>
              <p className="text-base font-normal text-gray-500">
                Ordini totali
              </p>
            </div>
            <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
              23%
              <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
              </svg>
            </div>
          </div>
          
          <div ref={ordersChartElRef} style={{ minHeight: '350px' }} />

          <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
            <div className="flex justify-between items-center pt-5">
              <button
                id="ordersDropdown"
                data-dropdown-toggle="ordersDropdownMenu"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
                onClick={() => setOrdersPeriod(ordersPeriod === 'week' ? 'month' : 'week')}
              >
                {ordersPeriod === 'week' ? 'Ultimi 7 giorni' : 'Ultimo mese'}
                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-orange-600 hover:text-orange-700 hover:bg-gray-100 px-3 py-2"
              >
                Report Ordini
                <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Grafico Guadagni */}
        <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex justify-between">
            <div>
              <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
                €{revenuePeriod === 'week' 
                  ? revenueData.lastWeek.reduce((a, b) => a + b, 0).toLocaleString()
                  : revenueData.lastMonth.reduce((a, b) => a + b, 0).toLocaleString()}
              </h5>
              <p className="text-base font-normal text-gray-500">
                Guadagni totali
              </p>
            </div>
            <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
              18%
              <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
              </svg>
            </div>
          </div>
          
          <div ref={revenueChartElRef} style={{ minHeight: '350px' }} />

          <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
            <div className="flex justify-between items-center pt-5">
              <button
                id="revenueDropdown"
                data-dropdown-toggle="revenueDropdownMenu"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
                onClick={() => setRevenuePeriod(revenuePeriod === 'week' ? 'month' : 'week')}
              >
                {revenuePeriod === 'week' ? 'Ultimi 7 giorni' : 'Ultimo mese'}
                <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-green-600 hover:text-green-700 hover:bg-gray-100 px-3 py-2"
              >
                Report Guadagni
                <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Box Spese di Gestione */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Spese di Gestione</h2>
          <span className="text-sm text-gray-500">Aprile 2024</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Costo Base</p>
                <p className="text-xl font-bold text-gray-900">€29.99</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Abbonamento mensile alla piattaforma</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Commissioni</p>
                <p className="text-xl font-bold text-gray-900">€125.50</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Commissioni sulle transazioni (2.5%)</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Totale</p>
                <p className="text-xl font-bold text-gray-900">€155.49</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Spesa totale del mese</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">Nota sulle commissioni</h3>
              <p className="text-sm text-orange-700 mt-1">
                Le commissioni vengono calcolate sul totale delle transazioni del mese. La percentuale attuale è del 2.5% su ogni ordine completato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
